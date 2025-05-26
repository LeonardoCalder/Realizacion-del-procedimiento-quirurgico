document.getElementById('medicalForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // 1. Datos del Médico
  const doctorName = document.getElementById('doctorName').value;
  const specialty = document.getElementById('specialty').value;
  const institution = document.getElementById('institution').value;

  // 2. Datos del Paciente
  const patientName = document.getElementById('patientName').value;
  const documentType = document.getElementById('documentType').value;
  const documentNumber = document.getElementById('documentNumber').value;
  const age = document.getElementById('age').value;
  const sex = document.getElementById('sex').value;
  const mainDiagnosis = document.getElementById('mainDiagnosis').value;
  const procedureDone = document.getElementById('procedureDone').value;

  // 3. Información del Procedimiento
  const procedureName = document.getElementById('procedureName').value;
  const procedureCode = document.getElementById('procedureCode').value;
  const procedureDate = document.getElementById('procedureDate').value;
  const procedureTime = document.getElementById('procedureTime').value;
  const procedureType = document.getElementById('procedureType').value;
  const procedureDescription = document.getElementById('procedureDescription').value;
  const technique = document.getElementById('technique').value;
  const anesthesia = document.getElementById('anesthesia').value;
  const patientStatus = document.getElementById('patientStatus').value;
  const followUp = document.getElementById('followUp').value;

  // Objeto final sin medicamentos
  const serviceRequestData = {
    doctor: {
      name: doctorName,
      specialty,
      institution
    },
    patient: {
      name: patientName,
      documentType,
      documentNumber,
      age,
      sex,
      mainDiagnosis,
      procedureDone
    },
    procedure: {
      name: procedureName,
      code: procedureCode,
      date: procedureDate,
      time: procedureTime,
      type: procedureType,
      description: procedureDescription,
      technique,
      anesthesia,
      patientStatus,
      followUp
    }
  };

  console.log(serviceRequestData);

  fetch('https://hl7-fhir-ehr-leonardo.onrender.com/clinical-procedure/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serviceRequestData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    alert('Registro creado exitosamente!');
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Hubo un error al crear el registro.');
  });
});
