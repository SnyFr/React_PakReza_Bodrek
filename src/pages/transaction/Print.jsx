import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { CardBody } from "react-bootstrap";

const PrintTransaction = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get('order_id');
  const status = searchParams.get('transaction_status');

  const [orders, setOrders] = useState([]);
  const [Loadin, setLoading] = useState(true);

  const handlePrint = () => {
    window.print();
  }

  return (
    <>
      <div className="max-w-md mx-auto my-6 space-y-4">
        <div className="flex items-center justify-between print:hidden">
          <Button variant="outline" onClick={() => navigate('/transactions')}>Back</Button>
          <Button onClick={handlePrint} size="sm" className="bg-primary">Print Receipt</Button>
        </div>
      </div>
      <Card className="border border-border/80 shadow-none font-mono text-xs p-6 bg-white text-black print:border-none">
        <CardHeader className="text-center p-0 pb-4 border-b border-dashed border-zinc-400">
          <CardTitle className="text-base font-bold uppercase tracking-wider">
            POS Warkop Akung
          </CardTitle>
          <p className="text-[11px] text-zinc-400">Jl. in Aja</p>
          <p className="text-[11px] text-zinc-500 mt-1">{new Date().toLocaleString('id-ID')}</p>
          <p></p>
        </CardHeader>
        <CardContent className="p-0 pt-3 space-y-3">
            <div className="space-y-0 5 text-[11px]">
              <div className="flex justify between items-center">
                <span>Order Number : </span>
                <span className="uppercase">{orderId}</span>
              </div>
              <div className="flex justify between items-center">
                <span>Payment Method : </span>
                <span className="uppercase">Qris</span>
              </div>
            </div>
            <div className="border-t border-dashed border-zinc-400 pt-2 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Mi Sedap</div>
                  <div className="text-[10px] text-zinc-600">
                    1 x Rp.100.000
                  </div>
                </div>
                <div className="font-medium">
                  Rp.100.000
                </div>
              </div>
              <div className="border-t border-dashed border-zinc-400 pt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rp.100.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax(10%)</span>
                  <span>Rp.10.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>Rp.110.000</span>
                </div>
              </div>
            </div>
            <div className="border-t border-dashed border-zinc-400 pt-4 text-center space-y-1">
              <p className="text-semibold">Thank You</p>
              <p className="text-[10px] text-zinc-500">Please come back again! || Warkop Akung</p>
            </div>
        </CardContent>
      </Card>

    </>
  )
}

export default PrintTransaction;