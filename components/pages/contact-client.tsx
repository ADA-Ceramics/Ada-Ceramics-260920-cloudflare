"use client"

import { useState } from "react"
import { Mail, Phone, Send, Check } from "lucide-react"
import { Footer } from "@/components/layout/footer"
import { SiloBreadcrumb } from "@/components/silo/SiloBreadcrumb"
import { companyInfo } from "@/lib/data"
import { CONTACT_API } from "@/components/home/types"

interface ContactClientProps {
  locale: string
}

export function ContactClient({ locale }: ContactClientProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    category: "",
    quantity: "",
    details: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      // 只有真正发送成功才显示弹窗
      if (res.ok && data.success) {
        setShowSuccessModal(true)

        // 2秒后跳转 WhatsApp
        setTimeout(() => {
          const whatsappMessage = `Hi, I'm ${formData.fullName} from ${formData.company}. 
Email: ${formData.email}
Phone: ${formData.phone}
Product Category: ${formData.category}
Quantity: ${formData.quantity}
Details: ${formData.details}`
          
          window.open(
            `https://wa.me/8615919512131?text=${encodeURIComponent(whatsappMessage)}`,
            "_blank"
          )
          setShowSuccessModal(false)
        }, 2000)
      } else {
        console.error("提交失败", data)
        alert("Failed to send message: " + (data.error || "Please try again"))
      }

    } catch (err) {
      console.error("Error submitting form:", err)
      alert("Network error, please try again later")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 成功提示弹窗 */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
            <p className="text-gray-600">Thank you for contacting us. We will get back to you within 24 hours.</p>
            <p className="text-sm text-gray-400 mt-4">Redirecting to WhatsApp...</p>
          </div>
        </div>
      )}

      <section className="pt-32 pb-16 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 面包屑 Home > Contact（与 About/Factory 同款，含 BreadcrumbSchema） */}
          <SiloBreadcrumb locale={locale} slug="contact" label="Contact" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#1a1a1a' }}>
            Contact Us Today
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6b7280' }}>
            We are ready to answer your inquiries about our products, OEM/ODM services, pricing, and cooperation.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <a href={`mailto:${companyInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <a href={`tel:${companyInfo.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {companyInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-product-category" className="block text-sm font-medium text-foreground mb-2">Product Category *</label>
                      <select
                        id="contact-product-category"
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      >
                        <option value="">Select product category</option>
                        <option value="ceramic">Ceramic Tableware</option>
                        <option value="custom">Custom Design</option>
                        <option value="other">Other Products</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Order Quantity</label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message Details *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Inquiry
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
