// frontend/design-system/components/molecules/WhatsAppSendModal.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MessageCircle } from 'lucide-react-native';
import { Dialog } from '../atoms/Dialog';
import { Button } from '../atoms/Button';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { kayoSpace, kayoBorder, kayoRadius, kayoColors } from '../../foundations/tokens';
import type { WaTarget, WhatsAppPref } from './WhatsAppPrefPicker';
export interface WhatsAppStudentRecipient {
  name?: string;
  fatherName?: string | null;
  fatherPhone?: string | null;
  motherName?: string | null;
  motherPhone?: string | null;
  whatsappPref?: WhatsAppPref | null;
  parentName?: string | null;
  parentPhone?: string | null;
}
import { openWhatsAppMessage } from '../../utils/whatsapp';

type MessageType = 'fees' | 'classUpdates' | 'attendance';

interface WhatsAppSendModalProps {
  visible: boolean;
  onClose: () => void;
  messageType: MessageType;
  student: WhatsAppStudentRecipient;
  messageText: string;
}

const LABEL: Record<MessageType, string> = {
  fees: 'Fees Reminder',
  classUpdates: 'Class Update',
  attendance: 'Attendance Alert',
};


export function WhatsAppSendModal({
  visible,
  onClose,
  messageType,
  student,
  messageText,
}: WhatsAppSendModalProps) {
  // Determine default selection from student's saved pref
  const savedPref: WaTarget =
    student.whatsappPref?.[messageType] ??
    (student.fatherPhone && student.motherPhone ? 'both' : student.fatherPhone ? 'father' : 'mother');

  const [sendFather, setSendFather] = useState(savedPref === 'father' || savedPref === 'both');
  const [sendMother, setSendMother] = useState(savedPref === 'mother' || savedPref === 'both');

  // Reset selections when modal opens or pref changes
  useEffect(() => {
    if (visible) {
      setSendFather(savedPref === 'father' || savedPref === 'both');
      setSendMother(savedPref === 'mother' || savedPref === 'both');
    }
  }, [visible, savedPref]);

  // Resolve phone numbers: prefer new fields, fall back to legacy parentPhone
  const fatherPhone = student.fatherPhone || null;
  const motherPhone = student.motherPhone || null;
  const legacyPhone = student.parentPhone || null;

  // If no split parent phones, use legacy parentPhone and show as single option
  const useLegacy = !fatherPhone && !motherPhone && !!legacyPhone;

  async function send() {
    const sends: string[] = [];

    if (useLegacy && legacyPhone) {
      sends.push(legacyPhone);
    } else {
      if (sendFather && fatherPhone) sends.push(fatherPhone);
      if (sendMother && motherPhone) sends.push(motherPhone);
    }

    for (const phone of sends) {
      await openWhatsAppMessage(phone, messageText);
    }
    onClose();
  }

  return (
    <Dialog
      visible={visible}
      onClose={onClose}
      title={`Send ${LABEL[messageType]}`}
      footer={
        <View style={styles.actionsRow}>
          <Button label="Cancel" variant="secondary" onPress={onClose} />
          <Button label="Send" variant="primary" onPress={send} testID="wa-send-btn" />
        </View>
      }
    >
      <View style={styles.recipientList}>
        {useLegacy ? (
          <View style={styles.recipientRow}>
            <MessageCircle size={16} color={kayoColors.positive[600]} strokeWidth={2} />
            <Text style={[typography.body_sm, { color: theme.text.primary, flex: 1 }]}>
              {student.parentName ?? 'Parent'}  {legacyPhone}
            </Text>
          </View>
        ) : (
          <>
            {fatherPhone ? (
              <Pressable
                style={styles.recipientRow}
                onPress={() => setSendFather((v) => !v)}
                testID="wa-send-father"
              >
                <View style={[styles.checkbox, sendFather && styles.checkboxActive]}>
                  {sendFather ? <Text style={styles.checkmark}>âœ“</Text> : null}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[typography.label_sm, { color: theme.text.primary }]}>
                    Father â€” {student.fatherName ?? 'Father'}
                  </Text>
                  <Text style={[typography.body_sm, { color: theme.text.secondary }]}>{fatherPhone}</Text>
                </View>
              </Pressable>
            ) : null}
            {motherPhone ? (
              <Pressable
                style={styles.recipientRow}
                onPress={() => setSendMother((v) => !v)}
                testID="wa-send-mother"
              >
                <View style={[styles.checkbox, sendMother && styles.checkboxActive]}>
                  {sendMother ? <Text style={styles.checkmark}>âœ“</Text> : null}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[typography.label_sm, { color: theme.text.primary }]}>
                    Mother â€” {student.motherName ?? 'Mother'}
                  </Text>
                  <Text style={[typography.body_sm, { color: theme.text.secondary }]}>{motherPhone}</Text>
                </View>
              </Pressable>
            ) : null}
          </>
        )}
      </View>
      <Text style={[typography.body_sm, { color: theme.text.tertiary }]}>
        Pre-filled from student defaults. Toggle to override for this send only.
      </Text>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  recipientList: { gap: kayoSpace[2], marginBottom: kayoSpace[3] },
  recipientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: kayoSpace[2],
    paddingVertical: kayoSpace[2],
    paddingHorizontal: kayoSpace[3],
    borderWidth: kayoBorder.widthHairline,
    borderColor: theme.border.default,
    borderRadius: kayoRadius.sm,
    backgroundColor: theme.surface.canvas,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.surface.card,
  },
  checkboxActive: { backgroundColor: theme.brand.primary, borderColor: theme.brand.primary },
  checkmark: { color: theme.text.onPrimary, fontSize: 13, fontWeight: '700' },
  actionsRow: { flexDirection: 'row', gap: kayoSpace[3], justifyContent: 'flex-end' },
});



