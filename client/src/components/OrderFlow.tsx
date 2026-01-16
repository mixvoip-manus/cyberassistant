import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Scale, Users, CheckCircle2, Upload, ArrowRight, ArrowLeft, Send, AlertCircle, Clock, Zap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type AssistancePackage = 'basic' | 'pro' | 'enterprise';
type AssuranceOption = 'none' | '50k' | '100k' | '250k';
type AdvisoryOption = 'none' | 'light' | 'standard' | 'enterprise';

interface OrderData {
  assistancePackage: AssistancePackage;
  userCount: number;
  assurance: AssuranceOption;
  advisory: AdvisoryOption;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  certificateFile: File | null;
  message: string;
}

interface OrderFlowProps {
  onClose: () => void;
}

export default function OrderFlow({ onClose }: OrderFlowProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState<OrderData>({
    assistancePackage: 'pro',
    userCount: 10,
    assurance: 'none',
    advisory: 'none',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    certificateFile: null,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isEnterpriseAssistance = orderData.assistancePackage === 'enterprise';
  const isEnterpriseAdvisory = orderData.advisory === 'enterprise';
  const needsConsultation = isEnterpriseAssistance || isEnterpriseAdvisory;

  // Basic package has max 25 users
  const maxUsers = orderData.assistancePackage === 'basic' ? 25 : 9999;

  const calculateTotal = () => {
    let yearly = 0;

    // Cyber Assistance pricing
    if (orderData.assistancePackage === 'basic') {
      // Basic is free (included in Mixvoip partnership)
      yearly += 0;
    } else if (orderData.assistancePackage === 'pro') {
      // Pro: €2/user/month
      yearly += orderData.userCount * 2 * 12;
    }
    // Enterprise is on request

    // Cyber Assurance: per user/year
    if (orderData.assurance === '50k') {
      yearly += orderData.userCount * 0.5 * 12;
    } else if (orderData.assurance === '100k') {
      yearly += orderData.userCount * 1 * 12;
    } else if (orderData.assurance === '250k') {
      yearly += orderData.userCount * 2 * 12;
    }

    // Cyber Advisory: yearly price
    if (orderData.advisory === 'light') {
      yearly += 500;
    } else if (orderData.advisory === 'standard') {
      yearly += 2000;
    }

    return { yearly: yearly.toFixed(2) };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOrderData({ ...orderData, certificateFile: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate email generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, this would send to a backend
    console.log('Order submitted:', orderData);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const totals = calculateTotal();

  // Get required score based on package
  const getRequiredScore = () => {
    if (orderData.assistancePackage === 'basic') return '60%';
    if (orderData.assistancePackage === 'pro') return '80%';
    return 'Custom';
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{t('order.success.title')}</h3>
          <p className="text-muted-foreground mb-6">{t('order.success.message')}</p>
          <Button onClick={onClose} className="bg-[#00B050] hover:bg-[#00873D]">
            {t('order.success.close')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{t('order.title')}</h2>
            <p className="text-muted-foreground">{t('order.step')} {step} / 4</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-2xl">
            ×
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${s <= step ? 'bg-[#00B050]' : 'bg-slate-200'}`}
              />
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Cyber Assistance Package Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#00B050] rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Cyber Assistance</h3>
                  <p className="text-muted-foreground">{t('order.assistance.selectPackage')}</p>
                </div>
              </div>

              <div className="grid gap-4">
                {/* Basic Package */}
                <button
                  onClick={() => setOrderData({ ...orderData, assistancePackage: 'basic', userCount: Math.min(orderData.userCount, 25) })}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    orderData.assistancePackage === 'basic' ? 'border-[#4A90D9] bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-bold text-lg text-[#4A90D9]">{t('pricing.assistance.basic.title')}</div>
                      <div className="text-sm text-muted-foreground">Fit4Cybersecurity ≥ 60%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#4A90D9]">{t('pricing.assistance.basic.price')}</div>
                      <div className="text-xs text-muted-foreground">{t('pricing.assistance.basic.priceNote')}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1"><Users className="h-3 w-3" /> {t('pricing.assistance.basic.users')}</div>
                    <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {t('pricing.assistance.basic.availability')}</div>
                    <div className="flex items-center gap-1"><Zap className="h-3 w-3" /> {t('pricing.assistance.basic.response')}</div>
                    <div className="flex items-center gap-1"><Shield className="h-3 w-3" /> {t('pricing.assistance.basic.crisis')}</div>
                  </div>
                </button>

                {/* Pro Package */}
                <button
                  onClick={() => setOrderData({ ...orderData, assistancePackage: 'pro' })}
                  className={`p-5 rounded-xl border-2 text-left transition-all relative ${
                    orderData.assistancePackage === 'pro' ? 'border-[#E63946] bg-red-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="absolute -top-3 left-4 bg-[#E63946] text-white text-xs px-2 py-1 rounded">
                    {t('pricing.mostPopular')}
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-bold text-lg text-[#E63946]">{t('pricing.assistance.pro.title')}</div>
                      <div className="text-sm text-muted-foreground">Fit4Cybersecurity ≥ 80%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#E63946]">2€</div>
                      <div className="text-xs text-muted-foreground">{t('pricing.perUserMonth')}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1"><Users className="h-3 w-3" /> {t('pricing.assistance.pro.users')}</div>
                    <div className="flex items-center gap-1 font-bold text-[#E63946]"><Clock className="h-3 w-3" /> {t('pricing.assistance.pro.availability')}</div>
                    <div className="flex items-center gap-1 font-bold text-[#E63946]"><Zap className="h-3 w-3" /> {t('pricing.assistance.pro.response')}</div>
                    <div className="flex items-center gap-1"><Shield className="h-3 w-3" /> {t('pricing.assistance.pro.crisis')}</div>
                  </div>
                </button>

                {/* Enterprise Package */}
                <button
                  onClick={() => setOrderData({ ...orderData, assistancePackage: 'enterprise' })}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    orderData.assistancePackage === 'enterprise' ? 'border-slate-800 bg-slate-100' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-bold text-lg text-slate-800">{t('pricing.assistance.enterprise.title')}</div>
                      <div className="text-sm text-muted-foreground">{t('pricing.assistance.enterprise.entry')}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-slate-800">{t('pricing.onRequest')}</div>
                      <div className="text-xs text-muted-foreground">{t('pricing.assistance.enterprise.priceNote')}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {t('pricing.assistance.enterprise.users')}</div>
                    <div className="flex items-center gap-1 font-bold"><Clock className="h-3 w-3" /> {t('pricing.assistance.enterprise.availability')}</div>
                    <div className="flex items-center gap-1 font-bold"><Zap className="h-3 w-3" /> {t('pricing.assistance.enterprise.response')}</div>
                    <div className="flex items-center gap-1"><Shield className="h-3 w-3" /> {t('pricing.assistance.enterprise.crisis')}</div>
                  </div>
                </button>
              </div>

              {/* User Count (only for Basic and Pro) */}
              {orderData.assistancePackage !== 'enterprise' && (
                <div className="mt-6">
                  <Label className="text-lg font-semibold">{t('order.userCount')}</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('order.userCountDesc')}
                    {orderData.assistancePackage === 'basic' && ` (max 25)`}
                  </p>
                  <Input
                    type="number"
                    min="1"
                    max={maxUsers}
                    value={orderData.userCount}
                    onChange={(e) => setOrderData({ ...orderData, userCount: Math.min(parseInt(e.target.value) || 1, maxUsers) })}
                    className="text-2xl font-bold h-14 text-center max-w-[200px]"
                  />
                </div>
              )}

              {/* Required Score Info */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-amber-800">{t('order.requiredScore')}: Fit4Cybersecurity ≥ {getRequiredScore()}</div>
                    <div className="text-amber-700">{t('order.requiredScoreDesc')}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Cyber Assurance */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Cyber Assurance</h3>
                  <p className="text-muted-foreground">{t('order.assurance.optional')}</p>
                </div>
              </div>

              <div className="grid gap-4">
                {/* None Option */}
                <button
                  onClick={() => setOrderData({ ...orderData, assurance: 'none' })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    orderData.assurance === 'none' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold">{t('order.none')}</div>
                  <div className="text-sm text-muted-foreground">{t('order.assurance.noneDesc')}</div>
                </button>

                {/* Coverage Options */}
                {[
                  { key: '50k' as AssuranceOption, coverage: '50.000€', price: '0,50€' },
                  { key: '100k' as AssuranceOption, coverage: '100.000€', price: '1,00€' },
                  { key: '250k' as AssuranceOption, coverage: '250.000€', price: '2,00€' },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setOrderData({ ...orderData, assurance: option.key })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      orderData.assurance === option.key ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold">{option.coverage} {t('order.assurance.coverage')}</div>
                        <div className="text-sm text-muted-foreground">{t('pricing.assurance.feature1')}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">{option.price}</div>
                        <div className="text-xs text-muted-foreground">{t('pricing.perUserMonth')}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                <p>{t('pricing.assurance.partner')}</p>
              </div>
            </div>
          )}

          {/* Step 3: Cyber Advisory */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Cyber Advisory</h3>
                  <p className="text-muted-foreground">{t('order.advisory.optional')}</p>
                </div>
              </div>

              <div className="grid gap-4">
                {/* None Option */}
                <button
                  onClick={() => setOrderData({ ...orderData, advisory: 'none' })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    orderData.advisory === 'none' ? 'border-purple-600 bg-purple-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold">{t('order.none')}</div>
                  <div className="text-sm text-muted-foreground">{t('order.advisory.noneDesc')}</div>
                </button>

                {/* Light */}
                <button
                  onClick={() => setOrderData({ ...orderData, advisory: 'light' })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    orderData.advisory === 'light' ? 'border-purple-600 bg-purple-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">Light – DPO as a Service</div>
                      <div className="text-sm text-muted-foreground">Data Protection Officer as a Service</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-600">500€</div>
                      <div className="text-xs text-muted-foreground">{t('pricing.year')}</div>
                    </div>
                  </div>
                </button>

                {/* Standard */}
                <button
                  onClick={() => setOrderData({ ...orderData, advisory: 'standard' })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    orderData.advisory === 'standard' ? 'border-purple-600 bg-purple-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">Standard – CISO as a Service</div>
                      <div className="text-sm text-muted-foreground">Chief Information Security Officer as a Service</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-600">2.000€</div>
                      <div className="text-xs text-muted-foreground">{t('pricing.year')}</div>
                    </div>
                  </div>
                </button>

                {/* Enterprise */}
                <button
                  onClick={() => setOrderData({ ...orderData, advisory: 'enterprise' })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    orderData.advisory === 'enterprise' ? 'border-purple-600 bg-purple-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">Enterprise – Custom solution</div>
                      <div className="text-sm text-muted-foreground">Full custom enterprise solution</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-600">{t('pricing.onRequest')}</div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg text-sm text-purple-800">
                <p>{t('pricing.advisory.partner')}</p>
              </div>
            </div>
          )}

          {/* Step 4: Contact Details & Certificate Upload */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold">{t('order.contactDetails')}</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>{t('order.companyName')} *</Label>
                  <Input
                    value={orderData.companyName}
                    onChange={(e) => setOrderData({ ...orderData, companyName: e.target.value })}
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <Label>{t('order.contactName')} *</Label>
                  <Input
                    value={orderData.contactName}
                    onChange={(e) => setOrderData({ ...orderData, contactName: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label>{t('order.email')} *</Label>
                  <Input
                    type="email"
                    value={orderData.email}
                    onChange={(e) => setOrderData({ ...orderData, email: e.target.value })}
                    placeholder="john@acme.com"
                  />
                </div>
                <div>
                  <Label>{t('order.phone')} ({t('order.optional')})</Label>
                  <Input
                    type="tel"
                    value={orderData.phone}
                    onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                    placeholder="+352 123 456"
                  />
                </div>
              </div>

              <div>
                <Label>{t('order.certificate')} *</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  {t('order.certificateDesc')} (≥ {getRequiredScore()})
                </p>
                <label className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#00B050] transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  {orderData.certificateFile ? (
                    <span className="text-[#00B050] font-medium">{orderData.certificateFile.name}</span>
                  ) : (
                    <span className="text-muted-foreground">{t('order.uploadCertificate')}</span>
                  )}
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <Label>{t('order.message')} ({t('order.optional')})</Label>
                <Textarea
                  value={orderData.message}
                  onChange={(e) => setOrderData({ ...orderData, message: e.target.value })}
                  placeholder={t('order.messagePlaceholder')}
                  rows={3}
                />
              </div>

              {/* Order Summary */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h4 className="font-bold mb-4">{t('order.summary')}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Cyber Assistance ({orderData.assistancePackage === 'basic' ? 'Basic' : orderData.assistancePackage === 'pro' ? 'Pro' : 'Enterprise'}
                      {orderData.assistancePackage !== 'enterprise' && ` - ${orderData.userCount} ${t('pricing.user')}s`})
                    </span>
                    <span>
                      {orderData.assistancePackage === 'basic' ? t('pricing.assistance.basic.price') : 
                       orderData.assistancePackage === 'pro' ? `€${(orderData.userCount * 2 * 12).toFixed(2)}/${t('pricing.year')}` :
                       t('pricing.onRequest')}
                    </span>
                  </div>
                  {orderData.assurance !== 'none' && (
                    <div className="flex justify-between">
                      <span>Cyber Assurance ({orderData.assurance})</span>
                      <span>€{(orderData.userCount * (orderData.assurance === '50k' ? 0.5 : orderData.assurance === '100k' ? 1 : 2) * 12).toFixed(2)}/{t('pricing.year')}</span>
                    </div>
                  )}
                  {orderData.advisory !== 'none' && (
                    <div className="flex justify-between">
                      <span>Cyber Advisory ({orderData.advisory})</span>
                      <span>
                        {orderData.advisory === 'light' ? '500€' : orderData.advisory === 'standard' ? '2.000€' : t('pricing.onRequest')}/{t('pricing.year')}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                    <span>{t('order.total')}</span>
                    <span className="text-[#00B050]">
                      {needsConsultation ? t('order.consultationRequired') : `${totals.yearly}€/${t('pricing.year')}`}
                    </span>
                  </div>
                </div>
              </div>

              {needsConsultation && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      {t('order.consultationNote')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="sticky bottom-0 bg-white border-t p-6 flex justify-between">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : onClose}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {step > 1 ? t('order.back') : t('order.cancel')}
          </Button>

          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              className="bg-[#00B050] hover:bg-[#00873D] gap-2"
            >
              {t('order.next')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !orderData.companyName || !orderData.contactName || !orderData.email || !orderData.certificateFile}
              className="bg-[#00B050] hover:bg-[#00873D] gap-2"
            >
              {isSubmitting ? t('order.submitting') : needsConsultation ? t('order.requestConsultation') : t('order.submit')}
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
