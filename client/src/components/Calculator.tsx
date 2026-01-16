import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Shield,
  Zap,
  Building2,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Step = 1 | 2 | 3;

interface FormData {
  fit4cyberScore: string;
  employees: string;
  isMixvoipCustomer: boolean | null;
  hadCyberAttack: boolean | null;
  selectedPackage: 'basic' | 'pro' | 'enterprise' | null;
  insuranceCoverage: '50k' | '100k' | '250k' | null;
  companyName: string;
  vatNumber: string;
  contactPerson: string;
  email: string;
  phone: string;
  termsAccepted: boolean;
  insuranceTermsAccepted: boolean;
  infoCorrect: boolean;
}

export default function Calculator() {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>(1);
  const [showResult, setShowResult] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fit4cyberScore: '',
    employees: '',
    isMixvoipCustomer: null,
    hadCyberAttack: null,
    selectedPackage: null,
    insuranceCoverage: null,
    companyName: '',
    vatNumber: '',
    contactPerson: '',
    email: '',
    phone: '',
    termsAccepted: false,
    insuranceTermsAccepted: false,
    infoCorrect: false,
  });

  const checkEligibility = () => {
    // User is eligible if they have a Fit4Cyber score >= 60%
    const eligible =
      formData.fit4cyberScore === '80+' || formData.fit4cyberScore === '60-79';
    setIsEligible(eligible);
    setShowResult(true);
  };

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    setShowSuccess(true);
  };

  const calculatePrice = () => {
    if (!formData.selectedPackage || !formData.employees) return null;

    const employeeRanges: Record<string, number> = {
      '1-10': 5,
      '11-25': 18,
      '26-50': 38,
      '51-100': 75,
      '100+': 100,
    };

    const avgEmployees = employeeRanges[formData.employees] || 10;

    if (formData.selectedPackage === 'basic') {
      return { monthly: 0, perUser: 0, total: 0 };
    }

    if (formData.selectedPackage === 'pro') {
      const perUser = 2;
      const total = avgEmployees * perUser;
      return { monthly: 0, perUser, total };
    }

    return null;
  };

  const price = calculatePrice();

  // Step 1: Check eligibility
  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">{t('calc.step1.title')}</h3>

      {/* Question 1: Fit4Cyber Score */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label className="text-base font-medium">{t('calc.q1')}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{t('calc.q1.help')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: '80+', label: t('calc.q1.opt1') },
            { value: '60-79', label: t('calc.q1.opt2') },
            { value: '<60', label: t('calc.q1.opt3') },
            { value: 'none', label: t('calc.q1.opt4') },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() =>
                setFormData({ ...formData, fit4cyberScore: option.value })
              }
              className={cn(
                'p-3 rounded-lg border-2 text-sm font-medium transition-all',
                formData.fit4cyberScore === option.value
                  ? 'border-[#00B050] bg-[#00B050]/10 text-[#00B050]'
                  : 'border-border hover:border-[#00B050]/50'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question 2: Employees */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label className="text-base font-medium">{t('calc.q2')}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{t('calc.q2.help')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {[
            { value: '1-10', label: t('calc.q2.opt1') },
            { value: '11-25', label: t('calc.q2.opt2') },
            { value: '26-50', label: t('calc.q2.opt3') },
            { value: '51-100', label: t('calc.q2.opt4') },
            { value: '100+', label: t('calc.q2.opt5') },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFormData({ ...formData, employees: option.value })}
              className={cn(
                'p-3 rounded-lg border-2 text-sm font-medium transition-all',
                formData.employees === option.value
                  ? 'border-[#00B050] bg-[#00B050]/10 text-[#00B050]'
                  : 'border-border hover:border-[#00B050]/50'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question 3: Mixvoip Customer */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label className="text-base font-medium">{t('calc.q3')}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{t('calc.q3.help')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setFormData({ ...formData, isMixvoipCustomer: true })}
            className={cn(
              'p-3 rounded-lg border-2 text-sm font-medium transition-all',
              formData.isMixvoipCustomer === true
                ? 'border-[#00B050] bg-[#00B050]/10 text-[#00B050]'
                : 'border-border hover:border-[#00B050]/50'
            )}
          >
            {t('calc.q3.yes')}
          </button>
          <button
            onClick={() => setFormData({ ...formData, isMixvoipCustomer: false })}
            className={cn(
              'p-3 rounded-lg border-2 text-sm font-medium transition-all',
              formData.isMixvoipCustomer === false
                ? 'border-[#00B050] bg-[#00B050]/10 text-[#00B050]'
                : 'border-border hover:border-[#00B050]/50'
            )}
          >
            {t('calc.q3.no')}
          </button>
        </div>
      </div>

      {/* Question 4: Previous Attack */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label className="text-base font-medium">{t('calc.q4')}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{t('calc.q4.help')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setFormData({ ...formData, hadCyberAttack: true })}
            className={cn(
              'p-3 rounded-lg border-2 text-sm font-medium transition-all',
              formData.hadCyberAttack === true
                ? 'border-[#00B050] bg-[#00B050]/10 text-[#00B050]'
                : 'border-border hover:border-[#00B050]/50'
            )}
          >
            {t('calc.q4.yes')}
          </button>
          <button
            onClick={() => setFormData({ ...formData, hadCyberAttack: false })}
            className={cn(
              'p-3 rounded-lg border-2 text-sm font-medium transition-all',
              formData.hadCyberAttack === false
                ? 'border-[#00B050] bg-[#00B050]/10 text-[#00B050]'
                : 'border-border hover:border-[#00B050]/50'
            )}
          >
            {t('calc.q4.no')}
          </button>
        </div>
      </div>

      {/* Result or Check Button */}
      {showResult ? (
        <div
          className={cn(
            'p-4 rounded-lg',
            isEligible ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
          )}
        >
          {isEligible ? (
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">{t('calc.result.eligible')}</p>
              </div>
            </div>
          ) : formData.fit4cyberScore === 'none' ? (
            <div>
              <p className="font-semibold text-amber-800 mb-3">{t('calc.result.noscore')}</p>
              <a
                href="https://fit4cybersecurity.nc3.lu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-900"
              >
                {t('calc.result.getAssessment')}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <div>
              <p className="font-semibold text-amber-800 mb-3">{t('calc.result.upgrade')}</p>
              <a
                href="https://fit4cybersecurity.nc3.lu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-900"
              >
                {t('calc.result.getAssessment')}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      ) : null}

      <div className="flex justify-end gap-3">
        {!showResult ? (
          <Button
            onClick={checkEligibility}
            disabled={
              !formData.fit4cyberScore ||
              !formData.employees ||
              formData.isMixvoipCustomer === null ||
              formData.hadCyberAttack === null
            }
            className="bg-[#00B050] hover:bg-[#00873D]"
          >
            {t('calc.check')}
          </Button>
        ) : isEligible ? (
          <Button onClick={() => setStep(2)} className="bg-[#00B050] hover:bg-[#00873D]">
            {t('calc.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );

  // Step 2: Choose package
  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">{t('calc.step2.title')}</h3>

      {/* Package Selection */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Basic */}
        <div
          onClick={() => {
            if (formData.isMixvoipCustomer && (formData.fit4cyberScore === '80+' || formData.fit4cyberScore === '60-79')) {
              setFormData({ ...formData, selectedPackage: 'basic' });
            }
          }}
          className={cn(
            'relative p-6 rounded-xl border-2 transition-all',
            formData.selectedPackage === 'basic'
              ? 'border-[#00B050] bg-[#00B050]/5'
              : 'border-border hover:border-[#00B050]/50',
            (!formData.isMixvoipCustomer || (formData.fit4cyberScore !== '80+' && formData.fit4cyberScore !== '60-79'))
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-pointer'
          )}
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-slate-600" />
            <h4 className="font-semibold text-lg">{t('package.basic')}</h4>
          </div>
          <div className="mb-4">
            <span className="text-3xl font-bold text-[#00B050]">{t('package.free')}</span>
            <span className="text-sm text-muted-foreground">*</span>
          </div>
          <ul className="space-y-2 text-sm mb-4">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#00B050]" />
              {t('package.basic.feature1')}
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#00B050]" />
              {t('package.basic.feature2')}
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#00B050]" />
              {t('package.basic.feature3')}
            </li>
          </ul>
          <p className="text-xs text-muted-foreground">{t('package.basic.note')}</p>
        </div>

        {/* Pro */}
        <div
          onClick={() => setFormData({ ...formData, selectedPackage: 'pro' })}
          className={cn(
            'relative p-6 rounded-xl border-2 transition-all cursor-pointer',
            formData.selectedPackage === 'pro'
              ? 'border-[#00B050] bg-[#00B050]/5'
              : 'border-border hover:border-[#00B050]/50'
          )}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-[#00B050] text-white text-xs font-semibold px-3 py-1 rounded-full">
              {t('package.recommended')}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-6 w-6 text-[#00B050]" />
            <h4 className="font-semibold text-lg">{t('package.pro')}</h4>
          </div>
          <div className="mb-4">
            <span className="text-3xl font-bold">2€</span>
            <span className="text-sm text-muted-foreground">{t('package.perUser')}</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#00B050]" />
              {t('package.pro.feature1')}
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#00B050]" />
              {t('package.pro.feature2')}
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#00B050]" />
              {t('package.pro.feature3')}
            </li>
            <li className="flex items-center gap-2 font-semibold text-[#00B050]">
              <Check className="h-4 w-4" />
              {t('package.pro.feature4')}
            </li>
          </ul>
        </div>

        {/* Enterprise */}
        <div
          onClick={() => setFormData({ ...formData, selectedPackage: 'enterprise' })}
          className={cn(
            'relative p-6 rounded-xl border-2 transition-all cursor-pointer',
            formData.selectedPackage === 'enterprise'
              ? 'border-[#00B050] bg-[#00B050]/5'
              : 'border-border hover:border-[#00B050]/50'
          )}
        >
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-6 w-6 text-slate-600" />
            <h4 className="font-semibold text-lg">{t('package.enterprise')}</h4>
          </div>
          <div className="mb-4">
            <span className="text-lg font-semibold text-muted-foreground">
              {t('package.custom')}
            </span>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#00B050]" />
              {t('package.enterprise.feature1')}
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#00B050]" />
              {t('package.enterprise.feature2')}
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#00B050]" />
              {t('package.enterprise.feature3')}
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#00B050]" />
              {t('package.enterprise.feature4')}
            </li>
          </ul>
        </div>
      </div>

      {/* Insurance Coverage Selection (for Pro package) */}
      {formData.selectedPackage === 'pro' && (
        <div className="bg-slate-50 rounded-xl p-6">
          <h4 className="font-semibold mb-2">{t('package.insurance.title')}</h4>
          <p className="text-sm text-muted-foreground mb-4">
            {t('package.insurance.description')}
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: '50k', label: t('package.insurance.option1'), price: '+0€' },
              { value: '100k', label: t('package.insurance.option2'), price: '+1€/user' },
              { value: '250k', label: t('package.insurance.option3'), price: '+2€/user' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  setFormData({
                    ...formData,
                    insuranceCoverage: option.value as '50k' | '100k' | '250k',
                  })
                }
                className={cn(
                  'p-4 rounded-lg border-2 text-center transition-all',
                  formData.insuranceCoverage === option.value
                    ? 'border-[#00B050] bg-white'
                    : 'border-border hover:border-[#00B050]/50 bg-white'
                )}
              >
                <span className="block font-semibold">{option.label}</span>
                <span className="text-sm text-muted-foreground">{option.price}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Summary */}
      {price && formData.selectedPackage !== 'enterprise' && (
        <div className="bg-[#00B050]/10 rounded-xl p-6">
          <div className="flex justify-between items-center">
            <span className="font-medium">Estimated monthly cost:</span>
            <span className="text-2xl font-bold text-[#00B050]">
              {formData.selectedPackage === 'basic'
                ? 'FREE'
                : `€${price.total}${formData.insuranceCoverage === '100k' ? ' + €' + Math.round(price.total / 2) : formData.insuranceCoverage === '250k' ? ' + €' + price.total : ''}/month`}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={() => setStep(1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('calc.back')}
        </Button>
        {formData.selectedPackage === 'enterprise' ? (
          <Button
            asChild
            className="bg-[#00B050] hover:bg-[#00873D]"
          >
            <a href="mailto:support@mixvoip.com?subject=Cyber Assistance Enterprise Inquiry">
              {t('package.contact')}
            </a>
          </Button>
        ) : (
          <Button
            onClick={() => setStep(3)}
            disabled={!formData.selectedPackage || (formData.selectedPackage === 'pro' && !formData.insuranceCoverage)}
            className="bg-[#00B050] hover:bg-[#00873D]"
          >
            {t('calc.continue')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );

  // Step 3: Checkout form
  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">{t('calc.step3.title')}</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">{t('form.company')}</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="Acme GmbH"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vatNumber">{t('form.vat')}</Label>
          <Input
            id="vatNumber"
            value={formData.vatNumber}
            onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
            placeholder="LU12345678"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactPerson">{t('form.contact')}</Label>
          <Input
            id="contactPerson"
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t('form.email')}</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@acme.com"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="phone">{t('form.phone')}</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+352 123 456 789"
          />
        </div>
      </div>

      {/* Terms */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms1"
            checked={formData.termsAccepted}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, termsAccepted: checked as boolean })
            }
          />
          <Label htmlFor="terms1" className="text-sm leading-relaxed cursor-pointer">
            {t('form.terms1')}
          </Label>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms2"
            checked={formData.insuranceTermsAccepted}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, insuranceTermsAccepted: checked as boolean })
            }
          />
          <Label htmlFor="terms2" className="text-sm leading-relaxed cursor-pointer">
            {t('form.terms2')}
          </Label>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms3"
            checked={formData.infoCorrect}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, infoCorrect: checked as boolean })
            }
          />
          <Label htmlFor="terms3" className="text-sm leading-relaxed cursor-pointer">
            {t('form.terms3')}
          </Label>
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <Button variant="outline" onClick={() => setStep(2)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('calc.back')}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={
            !formData.companyName ||
            !formData.email ||
            !formData.contactPerson ||
            !formData.termsAccepted ||
            !formData.insuranceTermsAccepted ||
            !formData.infoCorrect
          }
          className="bg-[#00B050] hover:bg-[#00873D]"
        >
          {t('form.submit')}
        </Button>
      </div>
    </div>
  );

  // Success state
  const renderSuccess = () => (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-[#00B050]/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="h-10 w-10 text-[#00B050]" />
      </div>
      <h3 className="text-2xl font-bold mb-2">{t('form.success.title')}</h3>
      <p className="text-lg text-[#00B050] font-semibold mb-4">{t('form.success.subtitle')}</p>
      <p className="text-muted-foreground max-w-md mx-auto">{t('form.success.message')}</p>
    </div>
  );

  return (
    <section id="calculator" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('calc.title')}</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          {!showSuccess && (
            <div className="flex items-center justify-center gap-4 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors',
                      step >= s
                        ? 'bg-[#00B050] text-white'
                        : 'bg-slate-200 text-slate-500'
                    )}
                  >
                    {step > s ? <Check className="h-5 w-5" /> : s}
                  </div>
                  <span
                    className={cn(
                      'ml-2 text-sm font-medium hidden sm:inline',
                      step >= s ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {t(`calc.step${s}`)}
                  </span>
                  {s < 3 && (
                    <div
                      className={cn(
                        'w-12 h-0.5 mx-4',
                        step > s ? 'bg-[#00B050]' : 'bg-slate-200'
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-border p-6 md:p-8">
            {showSuccess
              ? renderSuccess()
              : step === 1
              ? renderStep1()
              : step === 2
              ? renderStep2()
              : renderStep3()}
          </div>
        </div>
      </div>
    </section>
  );
}
