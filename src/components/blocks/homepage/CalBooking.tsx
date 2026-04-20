'use client'

import { Calendar, X } from 'lucide-react'
import { useState } from 'react'

export function CalBooking() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-orange-500/5 via-background to-amber-500/5 p-8 md:p-12">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Have a project in mind? Want to discuss AI, machine learning, or collaborate on something exciting? 
              Book a free 30-minute call and let's make it happen.
            </p>
          </div>
          
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
          >
            <Calendar className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span className="font-semibold">Schedule a Call</span>
          </button>
        </div>
      </div>

      {/* Modal with iframe */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl h-[90vh] bg-background rounded-2xl shadow-2xl overflow-hidden m-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background border border-border transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Cal.com iframe */}
            <iframe
              src="https://cal.com/hitesh-kumar-aiml/30min"
              className="w-full h-full border-0"
              title="Book a Meeting"
            />
          </div>
        </div>
      )}
    </div>
  )
}
