// OTP Service - Handles verification code generation and validation
// In production, integrate with Twilio (WhatsApp) or SendGrid (Email)

const otpStore = new Map<string, { code: string; expiresAt: number; attempts: number }>()

export const OTPService = {
  generate: (contact: string): string => {
    const code = Math.random().toString().slice(2, 8).padEnd(6, "0").slice(0, 6)

    console.log(`[v0] Generated OTP for ${contact}: ${code}`)

    otpStore.set(contact, {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
      attempts: 0,
    })

    // TODO: In production, send via:
    // - Twilio for WhatsApp: https://www.twilio.com/whatsapp
    // - SendGrid for Email: https://sendgrid.com
    // - AWS SNS for SMS: https://aws.amazon.com/sns/

    return code
  },

  verify: (contact: string, code: string): boolean => {
    const stored = otpStore.get(contact)

    if (!stored) {
      console.warn(`[v0] No OTP found for ${contact}`)
      return false
    }

    if (Date.now() > stored.expiresAt) {
      console.warn(`[v0] OTP expired for ${contact}`)
      otpStore.delete(contact)
      return false
    }

    if (stored.attempts >= 5) {
      console.warn(`[v0] Too many failed attempts for ${contact}`)
      otpStore.delete(contact)
      return false
    }

    if (stored.code !== code) {
      stored.attempts++
      return false
    }

    otpStore.delete(contact)
    return true
  },

  clear: (contact: string) => {
    otpStore.delete(contact)
  },
}
