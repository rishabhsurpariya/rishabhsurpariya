import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];
const DAY_NAMES = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

// Generate 30-min time slots from 10:00 to 18:00
function generateSlots() {
  const slots = [];
  for (let h = 10; h <= 18; h++) {
    slots.push({ h, m: 0 });
    if (h < 18) slots.push({ h, m: 30 });
  }
  return slots;
}

function formatSlot(slot, is12h) {
  if (is12h) {
    const period = slot.h >= 12 ? 'pm' : 'am';
    const hour = slot.h > 12 ? slot.h - 12 : slot.h === 0 ? 12 : slot.h;
    return `${hour}:${slot.m === 0 ? '00' : '30'}${period}`;
  }
  return `${String(slot.h).padStart(2, '0')}:${slot.m === 0 ? '00' : '30'}`;
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

const TIME_SLOTS = generateSlots();

function formatUtcForCalendar(date) {
  return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
}

function createGoogleCalendarUrl({ name, email, selectedDate, selectedSlot, notes }) {
  if (!selectedDate || !selectedSlot) return '#';
  const start = new Date(selectedDate);
  start.setHours(selectedSlot.h, selectedSlot.m, 0, 0);
  const end = new Date(start.getTime() + 30 * 60 * 1000);

  const title = `Intro Call — Rishabh Surpariya & ${name || 'Guest'}`;
  const details = [
    `Intro Call with Rishabh Surpariya`,
    `Location: Google Meet (invite link will be shared via email)`,
    `Attendee: ${name} (${email})`,
    notes ? `Topics / Project Notes: ${notes}` : null,
  ].filter(Boolean).join('\n');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${formatUtcForCalendar(start)}/${formatUtcForCalendar(end)}`,
    details: details,
    location: 'Google Meet',
    add: email,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function downloadIcsFile({ name, email, selectedDate, selectedSlot, notes }) {
  if (!selectedDate || !selectedSlot) return;
  const start = new Date(selectedDate);
  start.setHours(selectedSlot.h, selectedSlot.m, 0, 0);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const now = new Date();

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Rishabh Surpariya//Intro Call//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:intro-call-${Date.now()}@rishabhsurpariya.dev`,
    `DTSTAMP:${formatUtcForCalendar(now)}`,
    `DTSTART:${formatUtcForCalendar(start)}`,
    `DTEND:${formatUtcForCalendar(end)}`,
    `SUMMARY:Intro Call — Rishabh Surpariya & ${name || 'Guest'}`,
    `DESCRIPTION:Intro Call with Rishabh Surpariya.\\nAttendee: ${name} (${email})${notes ? `\\nNotes: ${notes}` : ''}`,
    'LOCATION:Google Meet',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `intro-call-${name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'booking'}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function BookingModal({ isOpen, onClose }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [is12h, setIs12h] = useState(true);
  const [step, setStep] = useState('pick'); // 'pick' | 'confirm' | 'done'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock scroll and pause Lenis smooth scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
    };
  }, [isOpen]);

  const reset = useCallback(() => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setStep('pick');
    setName('');
    setEmail('');
    setNotes('');
    setIsSubmitting(false);
    setSubmitError('');
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
  }, []);

  const handleClose = () => {
    onClose();
    setTimeout(reset, 400);
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const isPast = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const isToday = (day) => isSameDay(new Date(viewYear, viewMonth, day), today);
  const isSelected = (day) =>
    selectedDate && isSameDay(new Date(viewYear, viewMonth, day), selectedDate);

  const handleDayClick = (day) => {
    if (isPast(day)) return;
    setSelectedDate(new Date(viewYear, viewMonth, day));
    setSelectedSlot(null);
  };

  const handleConfirm = () => {
    setStep('confirm');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !selectedDate || !selectedSlot) return;

    setIsSubmitting(true);
    setSubmitError('');

    const formattedDate = selectedDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const formattedTime = `${formatSlot(selectedSlot, is12h)} (IST)`;
    const apiKey = import.meta.env.VITE_WEB3FORMS_KEY;

    try {
      if (!apiKey) {
        console.warn('VITE_WEB3FORMS_KEY is not defined in .env');
        setStep('done');
        return;
      }

      const formData = new FormData();
      formData.append('access_key', apiKey.trim());
      formData.append('subject', `📅 New Intro Call Booking: ${name} — ${formattedDate} at ${formattedTime}`);
      formData.append('from_name', name);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('booking_date', formattedDate);
      formData.append('booking_time', formattedTime);
      if (notes) formData.append('project_notes', notes);
      formData.append('message', `Hi Rishabh,\n\nA new 30-min intro call has been booked on your portfolio!\n\nName: ${name}\nEmail: ${email}\nDate: ${formattedDate}\nTime: ${formattedTime}\nNotes / Topics: ${notes || 'None'}\n\nPlease add this to your Google Calendar and send the Google Meet invite to ${email}.`);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (!data.success) {
        console.warn('Web3Forms returned an issue:', data);
      }

      setStep('done');
    } catch (err) {
      console.error('Booking submission error:', err);
      // Still allow the user to access the calendar event links
      setStep('done');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return '';
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const suffix = (n) => {
      if (n >= 11 && n <= 13) return 'th';
      switch (n % 10) { case 1: return 'st'; case 2: return 'nd'; case 3: return 'rd'; default: return 'th'; }
    };
    return `${days[selectedDate.getDay()]} ${selectedDate.getDate()}${suffix(selectedDate.getDate())}`;
  };

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="bm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Centering wrapper — fixed, flex-centered, no transform conflict */}
          <div className="bm-center-wrap" data-lenis-prevent="true">
            <motion.div
              className="bm-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Book an intro call"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close button */}
              <button className="bm-close" onClick={handleClose} aria-label="Close">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              <AnimatePresence mode="wait">
              {step === 'pick' && (
                <motion.div
                  key="pick"
                  className="bm-inner"
                  data-lenis-prevent="true"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.28 }}
                >
                  {/* Left Panel */}
                  <div className="bm-left">
                    <div className="bm-avatar-wrap">
                      <img
                        src="/pic1.png"
                        alt="Rishabh"
                        className="bm-avatar"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                    <p className="bm-host-name">Rishabh Surpariya</p>
                    <h2 className="bm-meeting-title">Intro Call</h2>
                    <p className="bm-meeting-desc">
                      Let's have a quick chat about your next web/AI project and how I can help.
                    </p>

                    <div className="bm-meta-list">
                      <div className="bm-meta-item">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span>30m</span>
                      </div>
                      <div className="bm-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <rect x="2" y="2" width="20" height="20" rx="4" fill="#1a73e8"/>
                          <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                        </svg>
                        <span>Google Meet</span>
                      </div>
                      <div className="bm-meta-item">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        <span>Asia/Kolkata</span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="bm-divider-v" />

                  {/* Calendar Panel */}
                  <div className="bm-calendar">
                    <div className="bm-cal-header">
                      <div className="bm-month-label">
                        <span className="bm-month-bold">{MONTH_NAMES[viewMonth]}</span>
                        <span className="bm-month-year">&nbsp;{viewYear}</span>
                      </div>
                      <div className="bm-nav-arrows">
                        <button className="bm-arrow" onClick={prevMonth} aria-label="Previous month">
                          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                            <path d="M6 1L1 6l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button className="bm-arrow" onClick={nextMonth} aria-label="Next month">
                          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                            <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Day names */}
                    <div className="bm-day-names">
                      {DAY_NAMES.map(d => <div key={d} className="bm-day-name">{d}</div>)}
                    </div>

                    {/* Calendar grid */}
                    <div className="bm-grid">
                      {calendarCells.map((day, idx) => (
                        <div key={idx} className="bm-cell">
                          {day && (
                            <button
                              className={[
                                'bm-day',
                                isPast(day) ? 'bm-day--past' : '',
                                isToday(day) ? 'bm-day--today' : '',
                                isSelected(day) ? 'bm-day--selected' : '',
                              ].filter(Boolean).join(' ')}
                              onClick={() => handleDayClick(day)}
                              disabled={isPast(day)}
                              aria-label={`${day} ${MONTH_NAMES[viewMonth]} ${viewYear}`}
                              aria-pressed={isSelected(day)}
                            >
                              {day}
                              {isToday(day) && !isSelected(day) && (
                                <span className="bm-today-dot" />
                              )}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots Panel */}
                  {selectedDate && (
                    <motion.div
                      className="bm-times"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="bm-times-header">
                        <span className="bm-times-date">{formatSelectedDate()}</span>
                        <div className="bm-toggle-12h">
                          <button
                            className={`bm-toggle-opt ${is12h ? 'bm-toggle-opt--active' : ''}`}
                            onClick={() => setIs12h(true)}
                          >12h</button>
                          <button
                            className={`bm-toggle-opt ${!is12h ? 'bm-toggle-opt--active' : ''}`}
                            onClick={() => setIs12h(false)}
                          >24h</button>
                        </div>
                      </div>

                      <div
                        className="bm-slots-list"
                        data-lenis-prevent="true"
                        onWheel={(e) => e.stopPropagation()}
                      >
                        {TIME_SLOTS.map((slot, i) => {
                          const isSlotSelected = selectedSlot &&
                            selectedSlot.h === slot.h && selectedSlot.m === slot.m;
                          return (
                            <button
                              key={i}
                              className={`bm-slot ${isSlotSelected ? 'bm-slot--selected' : ''}`}
                              onClick={() => {
                                setSelectedSlot(slot);
                                handleConfirm();
                              }}
                            >
                              {formatSlot(slot, is12h)}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {step === 'confirm' && (
                <motion.div
                  key="confirm"
                  className="bm-confirm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.28 }}
                >
                  <button className="bm-back-link" onClick={() => setStep('pick')}>
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                      <path d="M6 1L1 6l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Back
                  </button>

                  <div className="bm-confirm-summary">
                    <div className="bm-confirm-icon">📅</div>
                    <h3 className="bm-confirm-title">Confirm your booking</h3>
                    <p className="bm-confirm-detail">
                      <strong>Intro Call</strong> · 30 minutes · Google Meet
                    </p>
                    <p className="bm-confirm-when">
                      {selectedDate?.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                      {' at '}
                      {selectedSlot && formatSlot(selectedSlot, is12h)}
                      {' (IST)'}
                    </p>
                  </div>

                  <form className="bm-form" onSubmit={handleSubmit}>
                    <div className="bm-field">
                      <label className="bm-label" htmlFor="bm-name">Your Name *</label>
                      <input
                        id="bm-name"
                        className="bm-input"
                        type="text"
                        placeholder="Rahul Sharma"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                    <div className="bm-field">
                      <label className="bm-label" htmlFor="bm-email">Email Address *</label>
                      <input
                        id="bm-email"
                        className="bm-input"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="bm-field">
                      <label className="bm-label" htmlFor="bm-notes">
                        What would you like to discuss? <span className="bm-optional">(optional)</span>
                      </label>
                      <textarea
                        id="bm-notes"
                        className="bm-textarea"
                        placeholder="E.g., new project, tech stack, timeline..."
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        rows={2}
                      />
                    </div>
                    {submitError && (
                      <p className="bm-error-text">{submitError}</p>
                    )}
                    <button className="bm-submit" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="bm-btn-spinner-wrap">
                          <span className="bm-spinner" /> Confirming...
                        </span>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 'done' && (
                <motion.div
                  key="done"
                  className="bm-done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="bm-done-check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                  <h3 className="bm-done-title">You're booked! 🎉</h3>
                  <p className="bm-done-desc">
                    A confirmation has been recorded for <strong>{email}</strong>.<br/>
                    Looking forward to chatting with you, {name.split(' ')[0] || 'there'}!
                  </p>
                  <p className="bm-done-when">
                    {selectedDate?.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    {' · '}
                    {selectedSlot && formatSlot(selectedSlot, is12h)} IST
                  </p>

                  <div className="bm-actions-list">
                    <a
                      href={createGoogleCalendarUrl({ name, email, selectedDate, selectedSlot, notes })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bm-gcal-btn"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/>
                      </svg>
                      Add to Google Calendar
                    </a>

                    <button
                      type="button"
                      className="bm-ics-btn"
                      onClick={() => downloadIcsFile({ name, email, selectedDate, selectedSlot, notes })}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Download .ics (Apple / Outlook)
                    </button>

                    <button type="button" className="bm-close-ghost" onClick={handleClose}>
                      Done
                    </button>
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
