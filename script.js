function initCreateUser() {
  const form = document.getElementById("form-user");
  const alertContainer = document.createElement("div");
  alertContainer.id = "message";
  form.parentNode.insertBefore(alertContainer, form);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const repeatpassword = document.getElementById("repeatpassword").value.trim();

    alertContainer.innerHTML = "";

    if (!username || !email || !password || !repeatpassword) {showAlert("Por favor, completa todos los campos.", "danger");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {showAlert("Introduce un correo válido.", "danger");
      return;
    }

    if (password !== repeatpassword) {
      showAlert("Las contraseñas no coinciden.", "danger");
      return;
    }

    if (password.length < 6) {
      showAlert("La contraseña debe tener al menos 6 caracteres.", "danger");
      return;
    }

    const newUser = { username, email };
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    usuarios.push(newUser);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    showAlert("Usuario creado correctamente.", "success");

    setTimeout(() => {
      window.location.href = "users.html";
    }, 3000);
  });

  function showAlert(mensaje, tipo) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${tipo} mt-3`;
    alert.textContent = mensaje;
    alertContainer.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

function initShowUsers() {
  const container = document.getElementById("container-users");
  container.innerHTML = "";
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

  if (usuarios.length === 0) {
    container.innerHTML = `<p class="text-muted">No hay usuarios registrados.</p>`;
    return;
  }

  usuarios.forEach((usuario) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-3";
    card.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${usuario.username}</h5>
          <p class="card-text">${usuario.email}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}
