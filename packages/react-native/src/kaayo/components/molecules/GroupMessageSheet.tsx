/**
 * The single confirm-and-send surface for every WhatsApp message that goes to a batch group:
 * attendance reports, extra classes, cancellations, batch fee reminders, monthly summaries.
 *
 * The message arrives here already rendered with real values — tokens are an authoring concern
 * (Settings), never something a tutor sees at send time. Tapping Send hands off to WhatsApp with
 * the text pre-filled; the tutor picks the group there, because no deep link can name one.
 *
 * Grew out of the attendance-only SendReportPrompt, which this replaces.
 */
import React, { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';

import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { kayoSpace, kayoRadius, kayoBorder } from '../../foundations/tokens';
import { shareToWhatsApp } from '../../utils/whatsapp';

const MAX_MESSAGE_LEN = 1000;

export interface GroupMessageSheetProps {
  visible: boolean;
  /** Confirms what just happened, e.g. "Attendance marked ✓". */
  title: string;
  /** Names the group this is meant for, e.g. "Send to Karate — Evening". */
  subtitle?: string;
  /** Fully rendered message. Edits here apply to this send only — they are never saved back. */
  message: string;
  /** Blocks nothing; surfaces a caveat the tutor should see before sending anyway. */
  warning?: string;
  onClose: () => void;
  /** Fired after WhatsApp has been handed the message, not after it is actually sent. */
  onSent?: () => void;
  testID?: string;
}

/**
 * A fresh open is a fresh message — a batch cancelled after an attendance send must not inherit
 * the previous body, and any per-send edit dies with the sheet that made it. That reset comes from
 * unmounting the body on close and keying it on the message, so draft state never outlives the
 * send it belongs to; an effect that reset the same state would run a render late.
 */
export function GroupMessageSheet({ visible, onClose, testID, ...rest }: GroupMessageSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} testID={testID}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          {visible ? <SheetBody key={rest.message} onClose={onClose} testID={testID} {...rest} /> : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function SheetBody({
  title,
  subtitle,
  message,
  warning,
  onClose,
  onSent,
  testID,
}: Omit<GroupMessageSheetProps, 'visible'>) {
  const [body, setBody] = useState(message);
  const [editing, setEditing] = useState(false);
  const [sending, setSending] = useState(false);

  async function send() {
    setSending(true);
    try {
      await shareToWhatsApp(body);
      onSent?.();
      onClose();
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Text style={[typography.heading_h3, { color: theme.text.primary }]}>{title}</Text>
      {subtitle ? (
        <Text style={[typography.body_base, { color: theme.text.secondary }]}>{subtitle}</Text>
      ) : null}

      {warning ? (
        <View style={styles.warning} testID={testID ? `${testID}-warning` : undefined}>
          <AlertTriangle size={16} color={theme.status.overdue.fg} strokeWidth={2} />
          <Text style={[typography.body_sm, { color: theme.text.secondary, flex: 1 }]}>{warning}</Text>
        </View>
      ) : null}

      {editing ? (
        <Input
          testID="group-message-input"
          value={body}
          onChangeText={setBody}
          multiline
          numberOfLines={6}
          maxLength={MAX_MESSAGE_LEN}
          autoFocus
          helperText="Applies to this message only."
        />
      ) : (
        <ScrollView style={styles.bubbleScroll} contentContainerStyle={styles.bubble}>
          <Text style={[typography.body_base, { color: theme.text.primary }]} testID="group-message-bubble">
            {body}
          </Text>
        </ScrollView>
      )}

      <View style={styles.actions}>
        <Button
          label={editing ? 'Done' : 'Edit'}
          variant="secondary"
          onPress={() => setEditing((v) => !v)}
          testID="group-message-edit"
        />
        <Button
          label="Send in WhatsApp"
          variant="primary"
          loading={sending}
          disabled={body.trim().length === 0}
          onPress={() => void send()}
          testID="group-message-send"
        />
      </View>
      <Pressable onPress={onClose} hitSlop={8} testID="group-message-later">
        <Text style={[typography.label_lg, { color: theme.text.tertiary, textAlign: 'center' }]}>Not now</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: theme.overlay.scrim, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: theme.surface.card,
    borderTopWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderTopLeftRadius: kayoRadius.md,
    borderTopRightRadius: kayoRadius.md,
    padding: kayoSpace[5],
    gap: kayoSpace[3],
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: kayoSpace[2],
    padding: kayoSpace[3],
    borderRadius: kayoRadius.sm,
    backgroundColor: theme.status.overdue.bg,
  },
  bubbleScroll: { maxHeight: 220 },
  bubble: {
    padding: kayoSpace[4],
    borderRadius: kayoRadius.md,
    backgroundColor: theme.surface.canvas,
    borderWidth: kayoBorder.widthHairline,
    borderColor: theme.border.subtle,
  },
  actions: { flexDirection: 'row', gap: kayoSpace[3], justifyContent: 'flex-end' },
});
