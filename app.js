document.getElementById('procedureForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const paciente = document.getElementById('paciente').value;
  const cirujano = document.getElementById('cirujano').value;
  const nombreCirujano = document.getElementById('nombreCirujano').value;
  const codigo = document.getElementById('codigo').value;
  const nombreProcedimiento = document.getElementById('nombreProcedimiento').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const resultado = document.getElementById('resultado').value;

  const procedimientoFHIR = {
    resourceType: "Procedure",
    status: "completed",
    code: {
      coding: [
        {
          system: "http://snomed.info/sct",
          code: codigo,
          display: nombreProcedimiento
        }
      ],
      text: nombreProcedimiento
    },
    subject: {
      reference: `Patient/${paciente}`
    },
    performer: [
      {
        actor: {
          reference: `Practitioner/${cirujano}`,
          display: nombreCirujano
        }
      }
    ],
    performedDateTime: `${fecha}T${hora}:00`,
    outcome: {
      text: resultado
    }
  };

  fetch('https://hl7-fhir-ehr-leonardo.onrender.com/procedure/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(procedimientoFHIR)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error al crear el Procedure: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Procedure registrado:', data);
    alert('Procedimiento registrado exitosamente. ID: ' + data.id);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error al registrar el procedimiento: ' + error.message);
  });
});
