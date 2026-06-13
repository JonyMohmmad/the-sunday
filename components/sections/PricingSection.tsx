'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useMotionVariants } from '@/lib/animations';

const plans = [
  {
    id: 'hobby',
    name: 'Hobby',
    price: { monthly: 'Free', annual: 'Free' },
    per: 'forever',
    description: 'Everything you need to get your first API live.',
    cta: 'Start for free',
    ctaVariant: 'ghost' as const,
    features: [
      '100k API calls / month',
      '1 deployment',
      '3 team members',
      'Community support',
      'Basic analytics',
      '99.9% uptime SLA',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { monthly: '$49', annual: '$39' },
    per: '/ month',
    description: 'For teams serious about reliability and scale.',
    cta: 'Start 14-day trial',
    ctaVariant: 'primary' as const,
    popular: true,
    features: [
      '10M API calls / month',
      '10 deployments',
      '15 team members',
      'Priority email support',
      'Advanced analytics',
      'Custom domains',
      '99.99% uptime SLA',
      'Audit logs',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: { monthly: 'Custom', annual: 'Custom' },
    per: 'pricing',
    description: 'For organizations that need unlimited scale and dedicated support.',
    cta: 'Talk to sales',
    ctaVariant: 'ghost' as const,
    features: [
      'Unlimited API calls',
      'Unlimited deployments',
      'Unlimited team members',
      'Dedicated support + SLA',
      'SSO / SAML',
      'Custom contracts',
      'Security review',
      'SOC 2 Type II',
    ],
  },
];

const comparisonRows = [
  { feature: 'API calls / month',    hobby: '100k',     pro: '10M',       enterprise: 'Unlimited' },
  { feature: 'Deployments',          hobby: '1',        pro: '10',        enterprise: 'Unlimited' },
  { feature: 'Team members',         hobby: '3',        pro: '15',        enterprise: 'Unlimited' },
  { feature: 'Custom domains',       hobby: false,      pro: true,        enterprise: true        },
  { feature: 'Advanced analytics',   hobby: false,      pro: true,        enterprise: true        },
  { feature: 'Audit logs',           hobby: false,      pro: true,        enterprise: true        },
  { feature: 'SSO / SAML',           hobby: false,      pro: false,       enterprise: true        },
  { feature: 'Dedicated support',    hobby: false,      pro: false,       enterprise: true        },
  { feature: 'SOC 2 Type II',        hobby: false,      pro: false,       enterprise: true        },
];

export default function PricingSection() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [tableOpen, setTableOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const v = useMotionVariants();

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          ref={ref}
          variants={v.fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <h2
            id="pricing-heading"
            className="font-bold tracking-tight mb-4"
            style={{
              fontSize: 'clamp(36px, 4vw, 52px)',
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            Simple pricing. No surprises.
          </h2>
          <p className="text-base" style={{ color: 'var(--text-2)' }}>
            Start free, scale when you need to. Cancel any time.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          variants={v.fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center mb-12"
        >
          <div
            className="relative flex p-1 rounded-full"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            {(['monthly', 'annual'] as const).map((option) => (
              <button
                key={option}
                onClick={() => setBilling(option)}
                className="relative px-5 py-2 text-sm font-medium rounded-full z-10 transition-colors duration-150"
                style={{
                  color: billing === option ? '#fff' : 'var(--text-2)',
                }}
              >
                {billing === option && (
                  <motion.div
                    layoutId="toggle-bg"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'var(--primary)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {option === 'monthly' ? 'Monthly' : 'Annual'}
                  {option === 'annual' && (
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(34,197,94,0.15)',
                        border: '1px solid rgba(34,197,94,0.3)',
                        color: '#86efac',
                      }}
                    >
                      Save 20%
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              variants={v.fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.15 + i * 0.1 }}
              whileHover={{ y: -4, borderColor: plan.popular ? 'rgba(59,130,246,0.6)' : 'rgba(255,255,255,0.12)' }}
              className="relative flex flex-col rounded-2xl p-7"
              style={{
                background: plan.popular ? 'rgba(59,130,246,0.05)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${plan.popular ? 'rgba(59,130,246,0.4)' : 'var(--border)'}`,
                transform: plan.popular ? 'scale(1.02)' : undefined,
                transition: 'border-color 0.2s ease',
                zIndex: plan.popular ? 1 : 0,
              }}
            >
              {plan.popular && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: 'var(--primary)' }}
                >
                  Most popular
                </div>
              )}

              <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>
                {plan.name}
              </h3>
              <p className="text-sm mb-5" style={{ color: 'var(--text-2)' }}>
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1.5 mb-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={billing + plan.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="font-bold"
                    style={{ fontSize: '42px', lineHeight: 1, color: 'var(--text)' }}
                  >
                    {plan.price[billing]}
                  </motion.span>
                </AnimatePresence>
                {plan.per !== 'forever' && plan.per !== 'pricing' && (
                  <span className="text-sm" style={{ color: 'var(--text-2)' }}>{plan.per}</span>
                )}
              </div>
              {plan.per === 'forever' && (
                <p className="text-xs mb-5" style={{ color: 'var(--text-2)' }}>free forever</p>
              )}
              {plan.per === 'pricing' && (
                <p className="text-xs mb-5" style={{ color: 'var(--text-2)' }}>contact us</p>
              )}
              {plan.per === '/ month' && (
                <p className="text-xs mb-5" style={{ color: 'var(--text-2)' }}>
                  {billing === 'annual' ? 'billed annually' : 'billed monthly'}
                </p>
              )}

              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-2)' }}>
                    <Check size={14} className="text-success flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.a
                href="#"
                whileHover={{ y: -1, filter: plan.ctaVariant === 'primary' ? 'brightness(1.1)' : undefined }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 px-5 rounded-xl text-sm font-semibold text-center transition-all duration-150 block"
                style={
                  plan.ctaVariant === 'primary'
                    ? { background: 'var(--primary)', color: '#fff' }
                    : {
                        border: '1px solid var(--border)',
                        color: 'var(--text-2)',
                      }
                }
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          variants={v.fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.5 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--border)' }}
        >
          <button
            onClick={() => setTableOpen((v) => !v)}
            className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium transition-colors duration-150"
            style={{
              background: 'var(--surface)',
              color: 'var(--text-2)',
              borderBottom: tableOpen ? '1px solid var(--border)' : 'none',
            }}
          >
            <span>Compare all features</span>
            <motion.svg
              animate={{ rotate: tableOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              width="16" height="16" viewBox="0 0 16 16" fill="none"
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </button>

          <AnimatePresence initial={false}>
            {tableOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <th className="text-left px-6 py-4 font-semibold" style={{ color: 'var(--text)', width: '40%' }}>
                        Feature
                      </th>
                      {plans.map((p) => (
                        <th key={p.id} className="text-center px-4 py-4 font-semibold" style={{ color: 'var(--text)' }}>
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr
                        key={row.feature}
                        style={{
                          borderBottom: i < comparisonRows.length - 1 ? '1px solid var(--border)' : 'none',
                          background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                        }}
                      >
                        <td className="px-6 py-3.5" style={{ color: 'var(--text-2)' }}>{row.feature}</td>
                        {[row.hobby, row.pro, row.enterprise].map((val, j) => (
                          <td key={j} className="text-center px-4 py-3.5">
                            {typeof val === 'boolean' ? (
                              val
                                ? <Check size={14} className="text-success mx-auto" />
                                : <X size={14} className="mx-auto" style={{ color: 'var(--text-3)' }} />
                            ) : (
                              <span style={{ color: 'var(--text)' }}>{val}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
