const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/order-builder/OrderBuilder.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Update imports
content = content.replace(
  `import { X, Check } from "lucide-react";`,
  `import { X, Check, MessageCircle, MessageSquare } from "lucide-react";`
);

// 2. Refactor submitOrder
const oldSubmitOrder = `  const submitOrder = () => {
    if (!orderData.orderDate) {
      alert(isEn ? "Please inform the order date." : "Por favor, informe a data da encomenda.");
      return;
    }
    const msg = generateWhatsAppMessage();
    if (isEn) {
      window.open(\`sms:+15715258279?&body=\${msg}\`, "_blank");
    } else {
      window.open(\`https://wa.me/15715258279?text=\${msg}\`, "_blank");
    }
  };`;

const newSubmitOrder = `  const openWhatsApp = () => {
    if (!orderData.orderDate) {
      alert(isEn ? "Please inform the order date." : "Por favor, informe a data da encomenda.");
      return;
    }
    const msg = generateWhatsAppMessage();
    window.open(\`https://wa.me/15715258279?text=\${msg}\`, "_blank");
  };

  const openSMS = () => {
    if (!orderData.orderDate) {
      alert(isEn ? "Please inform the order date." : "Por favor, informe a data da encomenda.");
      return;
    }
    const msg = generateWhatsAppMessage();
    window.open(\`sms:+15715258279?&body=\${msg}\`, "_blank");
  };`;

content = content.replace(oldSubmitOrder, newSubmitOrder);

// 3. Replace the buttons
const oldButton = `              {/* Submit Button */}
              <div className="mt-12 flex justify-center pb-20">
                <button 
                  onClick={submitOrder}
                  className={\`flex items-center space-x-3 text-white px-10 py-5 rounded-full font-bold tracking-wide uppercase transition-all shadow-lg hover:shadow-xl text-lg \${
                    orderData.orderDate ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                  }\`}
                >
                  <Check size={24} />
                  <span>{isEn ? "Continue in Messages" : "Finalizar pelo WhatsApp"}</span>
                </button>
              </div>`;

const newButtons = `              {/* Submit Buttons */}
              <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 pb-20">
                <button 
                  onClick={openWhatsApp}
                  disabled={!orderData.orderDate}
                  className={\`flex items-center justify-center space-x-3 text-white px-8 py-4 rounded-full font-bold tracking-wide uppercase transition-all shadow-md hover:shadow-lg text-sm md:text-base \${
                    orderData.orderDate ? "bg-[#25D366] hover:bg-[#20bd5a]" : "bg-gray-400 cursor-not-allowed"
                  }\`}
                >
                  <MessageCircle size={20} />
                  <span>{isEn ? "Send via WhatsApp" : "Enviar pedido pelo WhatsApp"}</span>
                </button>
                <button 
                  onClick={openSMS}
                  disabled={!orderData.orderDate}
                  className={\`flex items-center justify-center space-x-3 text-white px-8 py-4 rounded-full font-bold tracking-wide uppercase transition-all shadow-md hover:shadow-lg text-sm md:text-base \${
                    orderData.orderDate ? "bg-primary hover:bg-deep-cherry" : "bg-gray-400 cursor-not-allowed"
                  }\`}
                >
                  <MessageSquare size={20} />
                  <span>{isEn ? "Send via SMS" : "Enviar pedido por SMS"}</span>
                </button>
              </div>`;

content = content.replace(oldButton, newButtons);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('OrderBuilder.tsx updated with WhatsApp and SMS buttons.');
