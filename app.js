document.getElementById('procedureForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener valores del formulario
  const patientId = document.getElementById('patientId').value;
  const practitionerId = document.getElementById('practitionerId').value;
  const procedureCode = document.getElementById('procedureCode').value;
  const procedureDisplay = document.getElementById('procedureDisplay').value;
  const performedDate = document.getElementById('performedDate').value;
  const performedTime = document.getElementById('performedTime').value;
  const outcomeText = document.getElementById('outcome').value;

  // Formatear fecha y hora en ISO 8601
  const performedDateTime = `${performedDate}T${performedTime}:00`;

  // Crear recurso Procedure FHIR
  const procedureResource = {
    resourceType: "Procedure",
    status: "completed",
    code: {
      coding: [
        {
          system: "http://snomed.info/sct",
          code: procedureCode,
          display: procedureDisplay
        }
      ],
      text: procedureDisplay
    },
    subject: {
      reference: `Patient/${patientId}`
    },
    performer: [
      {
        actor: {
          reference: `Practitioner/${practitionerId}`
        }
      }
    ],
    performedDateTime: performedDateTime,
    outcome: {
      text: outcomeText
    }
  };

  // Enviar recurso al backend FHIR
  fetch('https://hl7-fhir-ehr-leonardo.onrender.com/procedure/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(procedureResource)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error al enviar el procedimiento: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Procedimiento creado:', data);
    alert('¡Procedimiento registrado con éxito! ID: ' + data.id);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error al registrar el procedimiento: ' + error.message);
  });
});
