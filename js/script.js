// Función para manejar la visualización del contenido
function toggleContent() {
    const content = document.querySelector('.content');
    const loginForm = document.querySelector('.login-form');
    const menu = document.querySelector('.menu');
    content.style.transform = 'translateX(50%)';
    loginForm.classList.toggle('hidden');
    if (!loginForm.classList.contains('hidden')) {
        menu.classList.add('hidden');  // Asegura que el menú esté oculto antes de iniciar sesión
    }
}

// Función para validar el inicio de sesión con manejo de errores y async/await
async function validateLogin(event) {
    event.preventDefault();  // Prevenir recarga de la página
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(username, password);
        console.log('Usuario logueado:', userCredential.user);
        document.querySelector('.menu').classList.remove('hidden');
    } catch (error) {
        console.error('Error de login:', error.message);
        alert('Usuario o contraseña incorrecta.');
    }
}

// Función para registrar usuarios con Firebase
async function registerUser(email, password) {
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log('Usuario registrado:', userCredential.user);
        // Puedes añadir aquí la llamada a `addUserDetails` si deseas guardar más información del usuario en Firestore
    } catch (error) {
        console.error('Error de registro:', error.message);
        alert('Error al registrar: ' + error.message);
    }
}

// Función para añadir detalles del usuario en Firestore
async function addUserDetails(userId, details) {
    try {
        await db.collection('users').doc(userId).set(details);
        console.log('Detalles de usuario añadidos');
    } catch (error) {
        console.error('Error añadiendo detalles de usuario:', error);
        alert('Error al añadir detalles del usuario: ' + error.message);
    }
}
