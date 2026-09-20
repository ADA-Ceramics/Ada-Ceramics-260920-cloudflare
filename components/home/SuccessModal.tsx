"use client"
import { Check } from "lucide-react"

interface SuccessModalProps {
  show: boolean
  onClose: () => void
}

export default function SuccessModal({ show, onClose }: SuccessModalProps) {
  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      aria-hidden={!show}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 id="success-modal-title" className="text-xl font-semibold text-gray-900 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-gray-600">Thank you for contacting us. We will get back to you within 24 hours.</p>
        <p className="text-sm text-gray-400 mt-4">Redirecting to WhatsApp...</p>
      </div>
    </div>
  )
}
