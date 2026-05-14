'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Printer, 
  Download, 
  DollarSign, 
  Building, 
  User, 
  Calendar, 
  CreditCard,
  Briefcase,
  FileText,
  Shield,
  CheckCircle
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function PayslipDetailPage() {
  const params = useParams()
  const id = params.id as string

  // Mock payroll record for the payslip
  const payslip = {
    employeeName: 'John Smith',
    employeeId: 'EMP-2024-001',
    department: 'Engineering',
    position: 'Senior Developer',
    period: 'May 2024',
    payDate: 'May 31, 2024',
    basicSalary: 5000.00,
    overtime: 240.00,
    bonus: 500.00,
    tax: 850.00,
    healthInsurance: 150.00,
    retirement: 250.00,
    netSalary: 4490.00,
    bankName: 'Global Trust Bank',
    accountNumber: '**** 5678'
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Action Header */}
      <div className="flex items-center justify-between no-print">
        <div className="flex items-center space-x-4">
          <Link href="/payroll" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Payslip Detail</h1>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => window.print()}
            className="bg-white text-gray-700 px-4 py-2 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 flex items-center shadow-sm"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 flex items-center shadow-lg shadow-blue-100">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Payslip Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden max-w-4xl mx-auto print:shadow-none print:border-0"
      >
        {/* Company Header */}
        <div className="p-10 bg-slate-900 text-white flex justify-between items-start">
           <div>
              <div className="flex items-center space-x-3 mb-4">
                 <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center font-black">NK</div>
                 <h2 className="text-2xl font-black tracking-tighter">NKHRMS PLATFORM</h2>
              </div>
              <p className="text-slate-400 text-sm">123 Business District, Silicon Valley<br/>California, USA</p>
           </div>
           <div className="text-right">
              <h3 className="text-3xl font-black text-blue-500 mb-1 uppercase tracking-tighter">Payslip</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">ID: {id || 'PSL-2024-55'}</p>
           </div>
        </div>

        {/* Employee Info */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-50">
           <div className="space-y-4">
              <div className="flex items-center">
                 <User className="h-4 w-4 text-gray-400 mr-3" />
                 <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Employee</p>
                    <p className="font-bold text-gray-900">{payslip.employeeName}</p>
                 </div>
              </div>
              <div className="flex items-center">
                 <Briefcase className="h-4 w-4 text-gray-400 mr-3" />
                 <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Designation</p>
                    <p className="font-bold text-gray-900">{payslip.position}</p>
                 </div>
              </div>
           </div>
           <div className="space-y-4">
              <div className="flex items-center">
                 <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                 <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pay Period</p>
                    <p className="font-bold text-gray-900">{payslip.period}</p>
                 </div>
              </div>
              <div className="flex items-center">
                 <CreditCard className="h-4 w-4 text-gray-400 mr-3" />
                 <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Method</p>
                    <p className="font-bold text-gray-900">{payslip.bankName} ({payslip.accountNumber})</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Financial Breakdown */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
           {/* Earnings */}
           <div>
              <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                 <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                 Earnings
              </h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">Basic Salary</span>
                    <span className="font-bold text-gray-900">${payslip.basicSalary.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">Overtime (12 hrs)</span>
                    <span className="font-bold text-gray-900">${payslip.overtime.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">Performance Bonus</span>
                    <span className="font-bold text-gray-900">${payslip.bonus.toFixed(2)}</span>
                 </div>
                 <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="font-black text-gray-900 uppercase text-xs tracking-widest">Gross Earnings</span>
                    <span className="text-lg font-black text-gray-900">${(payslip.basicSalary + payslip.overtime + payslip.bonus).toFixed(2)}</span>
                 </div>
              </div>
           </div>

           {/* Deductions */}
           <div>
              <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                 <TrendingDown className="h-4 w-4 mr-2 text-red-500" />
                 Deductions
              </h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">Income Tax (WHT)</span>
                    <span className="font-bold text-gray-900">${payslip.tax.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">Health Insurance</span>
                    <span className="font-bold text-gray-900">${payslip.healthInsurance.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">Retirement Contribution</span>
                    <span className="font-bold text-gray-900">${payslip.retirement.toFixed(2)}</span>
                 </div>
                 <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="font-black text-gray-900 uppercase text-xs tracking-widest">Total Deductions</span>
                    <span className="text-lg font-black text-red-600">${(payslip.tax + payslip.healthInsurance + payslip.retirement).toFixed(2)}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Net Salary Summary */}
        <div className="mx-10 mb-10 p-8 bg-blue-600 rounded-[2rem] text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
           <DollarSign className="absolute -left-4 -bottom-4 h-32 w-32 opacity-10" />
           <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-blue-100 text-xs font-black uppercase tracking-widest mb-1">Net Payable Amount</p>
              <h3 className="text-4xl font-black tracking-tighter">${payslip.netSalary.toFixed(2)}</h3>
           </div>
           <div className="flex flex-col items-center md:items-end">
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-2">
                 <CheckCircle className="h-4 w-4 text-blue-200" />
                 <span className="text-xs font-bold">Transaction Confirmed</span>
              </div>
              <p className="text-blue-100 text-[10px] font-mono">AUTH: {Math.random().toString(36).substring(7).toUpperCase()}</p>
           </div>
        </div>

        {/* Disclaimer */}
        <div className="p-8 bg-gray-50 text-center">
           <p className="text-xs text-gray-400 max-w-lg mx-auto">
              This is a computer-generated document and does not require a physical signature. For any discrepancies, please contact the HR department within 48 hours of receipt.
           </p>
        </div>
      </motion.div>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print\:shadow-none { box-shadow: none !important; }
          .print\:border-0 { border: 0 !important; }
        }
      `}</style>
    </div>
  )
}
