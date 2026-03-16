type PaymentStatusType = '' | 'paid' | 'pending' | 'failed';
interface PaymentStatusProps {
    status: PaymentStatusType
}

const paymentStatusMap: Record<PaymentStatusType, string> = {
    '': '',
    paid: "已付款",
    pending: "未付款",
    failed: "付款失敗",
}

const classNameMap: Record<PaymentStatusType, string> = {
    '': '',
    paid: "bg-green-500",
    pending: "bg-orange-500",
    failed: "bg-red-400"
}
const PaymentStatus = ({ status }: PaymentStatusProps) => {
    return (
        <div className={`${classNameMap[status]} flex flex-row justify-center items-center p-1 rounded-md text-sm text-white`}>
            {paymentStatusMap[status]}
        </div>
    )
}

export default PaymentStatus