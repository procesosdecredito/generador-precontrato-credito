<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generador de Precontrato de Crédito</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" src="app.jsx"></script>
</body>
</html>
  const { useState } = React;

// Importar íconos de Lucide manualmente
const FileText = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const Calculator = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2"></rect>
    <line x1="8" y1="6" x2="16" y2="6"></line>
    <line x1="16" y1="14" x2="16" y2="18"></line>
    <path d="M16 10h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M8 14h.01"></path>
    <path d="M12 18h.01"></path>
    <path d="M8 18h.01"></path>
  </svg>
);

const Download = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

function PrecontratoCredito() {
  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    apellidos: '',
    identificacion: '',
    domicilio: '',
    telefono: '',
    email: '',
    montoSolicitado: '',
    plazoMeses: '',
    tasaInteres: '',
    comisionApertura: ''
  });

  const [mostrarPrecontrato, setMostrarPrecontrato] = useState(false);

  const calcularCredito = () => {
    const monto = parseFloat(datosCliente.montoSolicitado) || 0;
    const plazo = parseInt(datosCliente.plazoMeses) || 0;
    const tasaAnual = parseFloat(datosCliente.tasaInteres) || 0;
    const comision = parseFloat(datosCliente.comisionApertura) || 0;

    const tasaMensual = tasaAnual / 12 / 100;
    const montoComision = monto * (comision / 100);
    
    let mensualidad = 0;
    if (tasaMensual > 0 && plazo > 0) {
      mensualidad = monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);
    } else if (plazo > 0) {
      mensualidad = monto / plazo;
    }

    const totalPagar = mensualidad * plazo;
    const interesTotal = totalPagar - monto;
    const cat = ((totalPagar + montoComision) / monto - 1) * (12 / plazo) * 100;

    return {
      mensualidad: mensualidad.toFixed(2),
      montoComision: montoComision.toFixed(2),
      totalPagar: totalPagar.toFixed(2),
      interesTotal: interesTotal.toFixed(2),
      cat: cat.toFixed(2)
    };
  };

  const handleChange = (e) => {
    setDatosCliente({
      ...datosCliente,
      [e.target.name]: e.target.value
    });
  };

  const generarPrecontrato = () => {
    if (datosCliente.nombre && datosCliente.apellidos && datosCliente.identificacion && 
        datosCliente.domicilio && datosCliente.telefono && datosCliente.email &&
        datosCliente.montoSolicitado && datosCliente.plazoMeses && 
        datosCliente.tasaInteres && datosCliente.comisionApertura) {
      setMostrarPrecontrato(true);
    } else {
      alert('Por favor completa todos los campos');
    }
  };

  const imprimirPrecontrato = () => {
    window.print();
  };

  const calculos = calcularCredito();
  const fechaHoy = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

  if (!mostrarPrecontrato) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 text-indigo-600"><Calculator /></div>
            <h1 className="text-3xl font-bold text-gray-800">Generador de Precontrato de Crédito</h1>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-indigo-900 mb-4">Datos del Cliente</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre(s)</label>
                  <input
                    type="text"
                    name="nombre"
                    value={datosCliente.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                  <input
                    type="text"
                    name="apellidos"
                    value={datosCliente.apellidos}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identificación (INE/Pasaporte)</label>
                  <input
                    type="text"
                    name="identificacion"
                    value={datosCliente.identificacion}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={datosCliente.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Domicilio Completo</label>
                  <input
                    type="text"
                    name="domicilio"
                    value={datosCliente.domicilio}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={datosCliente.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-green-900 mb-4">Datos del Crédito</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monto Solicitado ($)</label>
                  <input
                    type="number"
                    name="montoSolicitado"
                    value={datosCliente.montoSolicitado}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plazo (meses)</label>
                  <input
                    type="number"
                    name="plazoMeses"
                    value={datosCliente.plazoMeses}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tasa de Interés Anual (%)</label>
                  <input
                    type="number"
                    name="tasaInteres"
                    value={datosCliente.tasaInteres}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comisión por Apertura (%)</label>
                  <input
                    type="number"
                    name="comisionApertura"
                    value={datosCliente.comisionApertura}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {datosCliente.montoSolicitado && datosCliente.plazoMeses && (
              <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-900 mb-3">Vista Previa de Cálculos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Mensualidad:</p>
                    <p className="font-bold text-lg">${calculos.mensualidad}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Comisión:</p>
                    <p className="font-bold text-lg">${calculos.montoComision}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total a Pagar:</p>
                    <p className="font-bold text-lg">${calculos.totalPagar}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Interés Total:</p>
                    <p className="font-bold text-lg">${calculos.interesTotal}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">CAT:</p>
                    <p className="font-bold text-lg">{calculos.cat}%</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={generarPrecontrato}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <div className="w-5 h-5"><FileText /></div>
              Generar Precontrato
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="no-print mb-6 flex gap-4">
          <button
            onClick={() => setMostrarPrecontrato(false)}
            className="bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            ← Volver al Formulario
          </button>
          <button
            onClick={imprimirPrecontrato}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <div className="w-5 h-5"><Download /></div>
            Imprimir / Descargar PDF
          </button>
        </div>

        <div className="border-4 border-gray-800 p-12 bg-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">PRECONTRATO DE CRÉDITO</h1>
            <p className="text-sm text-gray-600">Documento de Intención de Financiamiento</p>
          </div>

          <div className="mb-8">
            <p className="text-justify leading-relaxed">
              En la Ciudad de México, a {fechaHoy}, comparecen por una parte <strong>{datosCliente.nombre} {datosCliente.apellidos}</strong>, 
              en adelante denominado como "EL ACREDITADO", con domicilio en {datosCliente.domicilio}, 
              identificado con {datosCliente.identificacion}, y por la otra parte [NOMBRE DE LA INSTITUCIÓN], 
              en adelante "EL ACREDITANTE", para celebrar el presente precontrato de crédito conforme a las siguientes:
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">DECLARACIONES</h2>
            <p className="mb-3"><strong>I. Declara EL ACREDITADO:</strong></p>
            <p className="ml-6 mb-4 text-justify">
              Que es su voluntad celebrar el presente precontrato de crédito y que cuenta con la capacidad legal 
              y económica para cumplir con las obligaciones que del mismo se deriven.
            </p>
            <p className="mb-3"><strong>II. Declara EL ACREDITANTE:</strong></p>
            <p className="ml-6 mb-4 text-justify">
              Que cuenta con los recursos necesarios para otorgar el crédito solicitado, sujeto a la aprobación 
              final del comité de crédito y la presentación de la documentación requerida.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">CLÁUSULAS</h2>
            
            <div className="mb-4">
              <p className="font-semibold mb-2">PRIMERA. MONTO Y CONDICIONES DEL CRÉDITO</p>
              <div className="ml-6 space-y-2">
                <p>• Monto del crédito: <strong>${parseFloat(datosCliente.montoSolicitado).toLocaleString('es-MX', {minimumFractionDigits: 2})} MXN</strong></p>
                <p>• Plazo: <strong>{datosCliente.plazoMeses} meses</strong></p>
                <p>• Tasa de interés anual: <strong>{datosCliente.tasaInteres}%</strong></p>
                <p>• Tasa de interés mensual: <strong>{(parseFloat(datosCliente.tasaInteres) / 12).toFixed(2)}%</strong></p>
                <p>• Comisión por apertura: <strong>{datosCliente.comisionApertura}% (${calculos.montoComision} MXN)</strong></p>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">SEGUNDA. PAGOS Y AMORTIZACIÓN</p>
              <div className="ml-6 space-y-2">
                <p>• Pago mensual: <strong>${calculos.mensualidad} MXN</strong></p>
                <p>• Total de intereses: <strong>${calculos.interesTotal} MXN</strong></p>
                <p>• Monto total a pagar: <strong>${calculos.totalPagar} MXN</strong></p>
                <p>• CAT (Costo Anual Total) sin IVA: <strong>{calculos.cat}%</strong></p>
                <p className="text-sm text-gray-600 mt-2">
                  Los pagos deberán realizarse los primeros 5 días naturales de cada mes.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">TERCERA. DATOS DE CONTACTO</p>
              <div className="ml-6 space-y-2">
                <p>• Teléfono: {datosCliente.telefono}</p>
                <p>• Correo electrónico: {datosCliente.email}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">CUARTA. VIGENCIA DEL PRECONTRATO</p>
              <p className="ml-6 text-justify">
                El presente precontrato tendrá una vigencia de 7 días naturales a partir de su firma, 
                durante los cuales EL ACREDITADO deberá realizar el pago de la comisión por apertura 
                correspondiente y presentar la documentación requerida para la formalización definitiva del crédito.
              </p>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">QUINTA. CONDICIONES SUSPENSIVAS</p>
              <p className="ml-6 text-justify">
                El otorgamiento definitivo del crédito queda sujeto a: (1) Aprobación del comité de crédito, 
                (2) Verificación de la información proporcionada, (3) Cumplimiento de requisitos documentales, 
                y (4) Evaluación crediticia satisfactoria.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-center mb-16">
              Enteradas las partes del contenido y alcance del presente precontrato, lo firman de conformidad.
            </p>
            
            <div className="grid grid-cols-2 gap-12 mt-20">
              <div className="text-center">
                <div className="border-t-2 border-gray-800 pt-2">
                  <p className="font-bold">{datosCliente.nombre} {datosCliente.apellidos}</p>
                  <p className="text-sm">EL ACREDITADO</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t-2 border-gray-800 pt-2">
                  <p className="font-bold">[REPRESENTANTE LEGAL]</p>
                  <p className="text-sm">EL ACREDITANTE</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-xs text-gray-500 text-center">
            <p>Este es un documento preliminar. No constituye un contrato definitivo hasta su formalización.</p>
            <p>Documento generado el {fechaHoy}</p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PrecontratoCredito />);
