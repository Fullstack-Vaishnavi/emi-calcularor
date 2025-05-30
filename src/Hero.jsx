/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Calculator, IndianRupee, TrendingUp, Calendar, PieChart } from 'lucide-react';

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculateEMI = () => {
    const monthlyRate = rate / (12 * 100);
    const months = tenure * 12;
    
    if (monthlyRate === 0) {
      const calculatedEmi = principal / months;
      setEmi(calculatedEmi);
      setTotalAmount(principal);
      setTotalInterest(0);
    } else {
      const calculatedEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                           (Math.pow(1 + monthlyRate, months) - 1);
      const calculatedTotalAmount = calculatedEmi * months;
      const calculatedTotalInterest = calculatedTotalAmount - principal;
      
      setEmi(calculatedEmi);
      setTotalAmount(calculatedTotalAmount);
      setTotalInterest(calculatedTotalInterest);
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [principal, rate, tenure]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(Math.round(num));
  };

  const principalPercentage = (totalAmount > 0) ? (principal / totalAmount) * 100 : 100;
  const interestPercentage = (totalAmount > 0) ? (totalInterest / totalAmount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">EMI Calculator</h1>
          </div>
          <p className="text-gray-600">Calculate your Equated Monthly Installments for loans</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Loan Details
            </h2>
            
            <div className="space-y-6">
              {/* Principal Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (Principal)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter loan amount"
                  />
                </div>
                <input
                  type="range"
                  min="50000"
                  max="10000000"
                  step="50000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full mt-2 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹50K</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter interest rate"
                />
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full mt-2 h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Loan Tenure (Years)
                </label>
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter loan tenure"
                />
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full mt-2 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* EMI Result */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Monthly EMI
              </h2>
              <div className="text-3xl font-bold mb-2">
                {formatCurrency(emi)}
              </div>
              <p className="text-blue-100">Amount to pay every month</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                <div className="text-xl font-bold text-gray-800">
                  {formatCurrency(totalAmount)}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Total Interest</div>
                <div className="text-xl font-bold text-red-600">
                  {formatCurrency(totalInterest)}
                </div>
              </div>
            </div>

            {/* Breakdown Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-600" />
                Payment Breakdown
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-gray-700">Principal</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(principal)}</div>
                    <div className="text-sm text-gray-500">{principalPercentage.toFixed(1)}%</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-gray-700">Interest</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(totalInterest)}</div>
                    <div className="text-sm text-gray-500">{interestPercentage.toFixed(1)}%</div>
                  </div>
                </div>

                {/* Visual Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                  <div 
                    className="bg-blue-500 h-3 rounded-l-full"
                    style={{width: `${principalPercentage}%`}}
                  ></div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Loan Summary</h4>
              <div className="text-sm text-yellow-700 space-y-1">
                <div>• Total payments: {tenure * 12} months</div>
                <div>• Monthly payment: {formatCurrency(emi)}</div>
                <div>• You'll pay {formatCurrency(totalInterest)} extra in interest</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;