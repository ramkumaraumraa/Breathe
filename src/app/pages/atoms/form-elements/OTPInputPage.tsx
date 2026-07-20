import { useState } from 'react'
import { ComponentPageLayout } from '@/app/components/shared/ComponentPageLayout'
import { useProductTheme } from '@/app/context/ProductThemeContext'
import { KayoBrutalistOTPInput } from '@/app/components/custom/kaayo/KayoBrutalistOTPInput'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/app/components/ui/input-otp'

export function OTPInputPage() {
  const { activeProduct } = useProductTheme()
  const isKaayo = activeProduct === 'kaayo'

  const [otp4, setOtp4] = useState('')
  const [otp6, setOtp6] = useState('')
  const [otpError, setOtpError] = useState('')

  function handleErrorSubmit() {
    setOtpError('incorrect')
  }
  function handleErrorReset() {
    setOtpError('')
  }

  return (
    <ComponentPageLayout
      title="OTP Input"
      description="One-time password input: a sequence of single-character slots for entering numeric codes sent via SMS or email."
      level="Atom"
      status="Stable"
      implemented={['lemniscate', 'aumraa', 'kaayo']}
      sections={[
        {
          title: '4-digit code',
          description: 'Compact OTP for short verification codes.',
          preview: isKaayo ? (
            <KayoBrutalistOTPInput
              length={4}
              value={otp4}
              onChange={setOtp4}
              autoFocus
            />
          ) : (
            <InputOTP maxLength={4} value={otp4} onChange={setOtp4}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          ),
          code: {
            react: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@aumraa/breathe/components/ui/input-otp'
import { useState } from 'react'

const [otp, setOtp] = useState('')

<InputOTP maxLength={4} value={otp} onChange={setOtp}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`,
            reactNative: {
              kaayo: `import { OTPInput } from '@kaayo/components/atoms/OTPInput'
import { useState } from 'react'

const [otp, setOtp] = useState('')

<OTPInput
  length={4}
  value={otp}
  onChangeText={setOtp}
  autoFocus
/>

// Token reference:
// Each slot: 44×52px, borderRadius 6
// Border: 2px solid theme.border.strong (#3b3d3f)
// Focus border: theme.brand.primary (#970103)
// Shadow: 2px 2px 0 #191b1f
// Font: 20px, bold, #191b1f`,
              lemniscate: `import { OTPInput } from '@lemniscate/components/atoms/OTPInput'
import { useState } from 'react'

const [otp, setOtp] = useState('')

<OTPInput length={4} value={otp} onChangeText={setOtp} autoFocus />`,
            },
          },
        },
        {
          title: '6-digit code',
          description: 'Standard 6-digit OTP with a middle separator.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
              <KayoBrutalistOTPInput
                length={6}
                value={otp6}
                onChange={setOtp6}
              />
              {otp6.length === 6 && (
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--kayo-color-primary, #970103)',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                }}>
                  Code entered: {otp6}
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-start gap-3">
              <InputOTP maxLength={6} value={otp6} onChange={setOtp6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {otp6.length === 6 && (
                <span className="text-xs font-semibold text-primary">
                  Code entered: {otp6}
                </span>
              )}
            </div>
          ),
          code: {
            react: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@aumraa/breathe/components/ui/input-otp'

<InputOTP maxLength={6} value={otp} onChange={setOtp}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
            reactNative: {
              kaayo: `<OTPInput
  length={6}
  value={otp}
  onChangeText={setOtp}
/>`,
              lemniscate: `<OTPInput length={6} value={otp} onChangeText={setOtp} />`,
            },
          },
        },
        {
          title: 'Error state',
          description: 'Displays an error when the entered code is wrong.',
          preview: isKaayo ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
              <KayoBrutalistOTPInput
                length={6}
                value={otpError ? '000000' : ''}
                onChange={() => {}}
                error={!!otpError}
              />
              {otpError && (
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#dc2626',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                }}>
                  Incorrect code. Please try again.
                </span>
              )}
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <button
                  onClick={handleErrorSubmit}
                  style={{
                    padding: '6px 14px',
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    backgroundColor: 'var(--kayo-color-primary, #970103)',
                    color: '#ffffff',
                    border: '2px solid var(--kayo-color-border, #3b3d3f)',
                    borderRadius: 6,
                    boxShadow: '2px 2px 0 #191b1f',
                    cursor: 'pointer',
                  }}
                >
                  Simulate error
                </button>
                <button
                  onClick={handleErrorReset}
                  style={{
                    padding: '6px 14px',
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    backgroundColor: '#ffffff',
                    color: '#3b3d3f',
                    border: '2px solid var(--kayo-color-border, #3b3d3f)',
                    borderRadius: 6,
                    boxShadow: '2px 2px 0 #191b1f',
                    cursor: 'pointer',
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-3">
              <InputOTP maxLength={6} value={otpError ? '000000' : ''} onChange={() => {}}>
                <InputOTPGroup className={otpError ? 'ring-1 ring-destructive rounded-md' : ''}>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup className={otpError ? 'ring-1 ring-destructive rounded-md' : ''}>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {otpError && (
                <span className="text-xs font-semibold text-destructive">
                  Incorrect code. Please try again.
                </span>
              )}
              <div className="flex gap-2 mt-1">
                <button
                  onClick={handleErrorSubmit}
                  className="px-3 py-1.5 text-xs font-semibold rounded-md bg-destructive text-destructive-foreground"
                >
                  Simulate error
                </button>
                <button
                  onClick={handleErrorReset}
                  className="px-3 py-1.5 text-xs font-semibold rounded-md border border-border"
                >
                  Reset
                </button>
              </div>
            </div>
          ),
          code: {
            react: `// Pass error={true} to show error styles
<OTPInput length={6} value={otp} onChange={setOtp} error={true} />
{error && (
  <span className="text-xs font-semibold text-destructive">
    Incorrect code. Please try again.
  </span>
)}`,
            reactNative: {
              kaayo: `<OTPInput
  length={6}
  value={otp}
  onChangeText={setOtp}
  error={true}
/>
{error && (
  <Text style={{ fontSize: 12, fontWeight: '600', color: '#dc2626' }}>
    Incorrect code. Please try again.
  </Text>
)}

// Token reference:
// Error border: #dc2626
// Error shadow: 2px 2px 0 #dc2626`,
              lemniscate: `<OTPInput length={6} value={otp} onChangeText={setOtp} error={true} />
{error && (
  <Text style={{ fontSize: 12, fontWeight: '600' }}>
    Incorrect code. Please try again.
  </Text>
)}`,
            },
          },
        },
        {
          title: 'Disabled',
          description: 'A pre-filled code in disabled state — cannot be edited.',
          preview: isKaayo ? (
            <KayoBrutalistOTPInput
              length={6}
              value="123456"
              disabled
            />
          ) : (
            <InputOTP maxLength={6} value="123456" disabled>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          ),
          code: {
            react: `<InputOTP maxLength={6} value="123456" disabled>
  ...
</InputOTP>`,
            reactNative: {
              kaayo: `<OTPInput
  length={6}
  value="123456"
  disabled
/>`,
              lemniscate: `<OTPInput length={6} value="123456" disabled />`,
            },
          },
        },
      ]}
    />
  )
}
