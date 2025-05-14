document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();

  const paciente = document.getElementById('paciente').value;
  const consulta = document.getElementById('consulta').value;
  const medico = document.getElementById('medico').value;
  const cedula = document.getElementById('cedula').value;
  const dx = document.getElementById('dx').value;
  const proc = document.getElementById('proc').value;
  const just = document.getElementById('just').value;
  const fechaCita = document.getElementById('fechaCita').value;
  const hora = document.getElementById('hora').value;

  const serviceRequestData = {
    paciente: paciente,
    consulta: consulta,
    medico: medico,
    cedula: cedula,
    diagnostico: dx,
    procedimiento: proc,
    justificacion: just,
    fechaCita: fechaCita,
    hora: hora
  };

  fetch('https://hl7-fhir-ehr-leonardo.onrender.com/service-request/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serviceRequestData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    alert('Service Request creado exitosamente! ID: ' + data._id);
    enviarProcedure(serviceRequestData);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Hubo un error en la solicitud: ' + error.message);
  });
});

function enviarProcedure(data) {
  const procedureData = {
    resourceType: "Procedure",
    status: "completed",
    code: {
      coding: [
        {
          system: "http://snomed.info/sct",
          code: "80146002", // SNOMED CT para apendicectomía
          display: data.procedimiento
        }
      ],
      text: data.procedimiento
    },
    subject: {
      reference: `Patient/${data.paciente}`
    },
    performer: [
      {
        actor: {
          reference: `Practitioner/${data.cedula}`,
          display: data.medico
        }
      }
    ],
    performedDateTime: `${data.fechaCita}T${horaToTime(data.hora)}`,
    outcome: {
      text: "Apéndice extirpado con éxito"
    },
    note: [
      {
        text: data.justificacion
      }
    ]
  };

  fetch('https://hl7-fhir-ehr-leonardo.onrender.com/procedure/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(procedureData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al crear el Procedure: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Procedure creado:', data);
    alert('Procedure creado exitosamente. ID: ' + data.id);
  })
  .catch(error => {
    console.error('Error al crear el Procedure:', error);
    alert('Error al registrar el procedimiento: ' + error.message);
  });
}

function horaToTime(hora) {
  switch (hora) {
    case "matutino": return "09:00:00";
    case "vespertino": return "14:00:00";
    case "nocturno": return "18:00:00";
    default: return "09:00:00";
  }
}
