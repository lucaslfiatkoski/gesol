import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface CalculationResult {
  systemSizeKw: number;
  estimatedCost: number;
  estimatedMonthlySavings: number;
  paybackPeriodMonths: number;
  annualSavings: number;
  co2Reduction: number;
}

export default function BudgetCalculator() {
  const [step, setStep] = useState<"calculator" | "form">("calculator");
  const [monthlyConsumption, setMonthlyConsumption] = useState(300);
  const [roofArea, setRoofArea] = useState(50);
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roofType: "ceramic",
    location: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Submit budget mutation
  const submitMutation = trpc.budget.submit.useMutation({
    onSuccess: () => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", roofType: "ceramic", location: "" });
      setTimeout(() => {
        setStatus("idle");
        setStep("calculator");
        setCalculation(null);
      }, 3000);
    },
    onError: (error) => {
      setStatus("error");
      setErrorMessage(error.message || "Erro ao enviar orçamento");
      setTimeout(() => setStatus("idle"), 3000);
    },
  });

  // Local calculation function
  const calculateBudget = (consumption: number, area: number): CalculationResult => {
    // Average cost per kWh in Brazil: ~R$ 0.70
    // Average solar panel cost: ~R$ 5,000 per kW installed
    // Average system efficiency: ~80%
    
    // System size needed (kW) - assuming 150W per m² of roof
    const systemSizeKw = (area * 150) / 1000;
    
    // Estimated cost (R$ 5,000 per kW)
    const estimatedCost = systemSizeKw * 5000;
    
    // Monthly savings (R$ 0.70 per kWh)
    const estimatedMonthlySavings = consumption * 0.70;
    
    // Payback period in months
    const paybackPeriodMonths = Math.round(estimatedCost / estimatedMonthlySavings);
    
    // Annual savings
    const annualSavings = estimatedMonthlySavings * 12;
    
    // CO2 reduction (kg per month)
    const co2Reduction = consumption * 0.5;

    return {
      systemSizeKw: parseFloat(systemSizeKw.toFixed(2)),
      estimatedCost: parseFloat(estimatedCost.toFixed(2)),
      estimatedMonthlySavings: parseFloat(estimatedMonthlySavings.toFixed(2)),
      paybackPeriodMonths,
      annualSavings: parseFloat(annualSavings.toFixed(2)),
      co2Reduction: parseFloat(co2Reduction.toFixed(2)),
    };
  };

  const handleCalculate = () => {
    const result = calculateBudget(monthlyConsumption, roofArea);
    setCalculation(result);
    setStep("form");
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (calculation) {
      setStatus("loading");
      submitMutation.mutate({
        ...formData,
        monthlyConsumption,
        roofArea,
        estimatedCost: calculation.estimatedCost,
        estimatedMonthlySavings: calculation.estimatedMonthlySavings,
        paybackPeriodMonths: calculation.paybackPeriodMonths,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {step === "calculator" ? (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Calculadora de Energia Solar</h3>

          <div className="space-y-8">
            {/* Monthly Consumption */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Consumo Mensal de Energia
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="10"
                  value={monthlyConsumption}
                  onChange={(e) => setMonthlyConsumption(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="bg-yellow-100 px-4 py-2 rounded-lg min-w-fit">
                  <p className="text-2xl font-bold text-yellow-600">{monthlyConsumption}</p>
                  <p className="text-xs text-slate-600">kWh/mês</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Verifique sua conta de energia para encontrar o consumo mensal
              </p>
            </div>

            {/* Roof Area */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Área do Telhado Disponível
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={roofArea}
                  onChange={(e) => setRoofArea(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="bg-blue-100 px-4 py-2 rounded-lg min-w-fit">
                  <p className="text-2xl font-bold text-blue-600">{roofArea}</p>
                  <p className="text-xs text-slate-600">m²</p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCalculate}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              Calcular Orçamento
            </Button>
          </div>
        </div>
      ) : calculation ? (
        <div className="space-y-6">
          {/* Results */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Seu Orçamento Personalizado</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 border-2 border-yellow-200">
                <p className="text-slate-600 text-sm font-medium mb-2">Tamanho do Sistema</p>
                <p className="text-3xl font-bold text-yellow-600">{calculation.systemSizeKw}</p>
                <p className="text-slate-500 text-xs mt-1">kW</p>
              </div>

              <div className="bg-white rounded-lg p-6 border-2 border-green-200">
                <p className="text-slate-600 text-sm font-medium mb-2">Economia Mensal</p>
                <p className="text-3xl font-bold text-green-600">
                  R$ {calculation.estimatedMonthlySavings.toLocaleString("pt-BR")}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
                <p className="text-slate-600 text-sm font-medium mb-2">Custo Estimado</p>
                <p className="text-3xl font-bold text-blue-600">
                  R$ {calculation.estimatedCost.toLocaleString("pt-BR")}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border-2 border-purple-200">
                <p className="text-slate-600 text-sm font-medium mb-2">Retorno do Investimento</p>
                <p className="text-3xl font-bold text-purple-600">{calculation.paybackPeriodMonths}</p>
                <p className="text-slate-500 text-xs mt-1">meses</p>
              </div>

              <div className="bg-white rounded-lg p-6 border-2 border-emerald-200">
                <p className="text-slate-600 text-sm font-medium mb-2">Economia Anual</p>
                <p className="text-3xl font-bold text-emerald-600">
                  R$ {calculation.annualSavings.toLocaleString("pt-BR")}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border-2 border-cyan-200">
                <p className="text-slate-600 text-sm font-medium mb-2">Redução de CO₂/mês</p>
                <p className="text-3xl font-bold text-cyan-600">{calculation.co2Reduction}</p>
                <p className="text-slate-500 text-xs mt-1">kg</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-8">
              <p className="text-slate-700 text-sm">
                <span className="font-semibold">Resumo:</span> Com um sistema de {calculation.systemSizeKw}kW, 
                você economizará <span className="text-green-600 font-bold">R$ {calculation.estimatedMonthlySavings.toLocaleString("pt-BR")}</span> por mês. 
                Seu investimento será recuperado em aproximadamente <span className="text-purple-600 font-bold">{calculation.paybackPeriodMonths} meses</span>.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setStep("calculator");
                  setCalculation(null);
                }}
                variant="outline"
                className="flex-1 py-3 rounded-lg font-semibold"
              >
                Recalcular
              </Button>
              <Button
                onClick={() => setStep("form")}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold"
              >
                Solicitar Orçamento
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {step === "form" && calculation && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-4">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Dados para Orçamento</h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-yellow-500"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-yellow-500"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Telefone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-yellow-500"
              placeholder="(11) 99999-9999"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Telhado</label>
            <select
              name="roofType"
              value={formData.roofType}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-yellow-500"
            >
              <option value="ceramic">Cerâmica</option>
              <option value="metal">Metal</option>
              <option value="concrete">Concreto</option>
              <option value="fiber">Fibrocimento</option>
              <option value="other">Outro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Localização</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-yellow-500"
              placeholder="Cidade, Estado"
            />
          </div>

          {status === "success" && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5" />
              <span>Orçamento enviado com sucesso!</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="button"
              onClick={() => setStep("calculator")}
              variant="outline"
              className="flex-1 py-3 rounded-lg font-semibold"
              disabled={status === "loading"}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              disabled={status === "loading"}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
              {status === "loading" ? "Enviando..." : "Enviar Orçamento"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

