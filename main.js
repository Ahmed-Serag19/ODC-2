const formButton = document.querySelector('#form-submit-btn');
const showUsers = document.querySelector('#show-users');
const username = document.querySelector('#username');
const userAge = document.querySelector('#user-age');
const userStatusActive = document.querySelector('#active');
const userStatusInactive = document.querySelector('#inactive');
const usernameError = document.querySelector('#username-error');
const ageError = document.querySelector('#age-error');
const usersContainer = document.querySelector('#users-container');
let users;

if (localStorage.getItem('Users') === null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem('Users'));
}

const formSubmitHandler = (e) => {
  e.preventDefault();
  formCheck();
  console.log(users);
  deleteEntries();
};

const formCheck = () => {
  if (username.value === '') {
    usernameError.classList.remove('d-none');
    return;
  }
  if (isNaN(Number(userAge.value)) || userAge.value === '') {
    ageError.classList.remove('d-none');
    console.log(isNaN(Number(userAge.value)));
    return;
  } else {
    users.push({
      id: users.length + 1,
      Username: username.value,
      Age: userAge.value,
      Status: userStatusActive.checked ? 'Active' : 'Inactive',
    });
    removeErrors();
    localStorage.setItem('Users', JSON.stringify(users));
    showUsersHandler();
  }
};

const removeErrors = () => {
  ageError.classList.add('d-none');
  usernameError.classList.add('d-none');
};

const deleteEntries = () => {
  username.value = null;
  userAge.value = null;
};

const showUsersHandler = () => {
  let createdUsers = ``;
  users.map((user, index) => {
    createdUsers += `<div class="col-md-4 border border-dark p-3  ">
        <p>Id: ${user.id}</p>
        <p>Username: ${user.Username}</p>
        <p>Age: ${user.Age}</p>
        <p>Status: ${user.Status}</p>
        <button 
        class="btn btn-outline-primary"
        id="delete-user"
        onclick="changeStatusHandler(${index})"
      >
        Change Status
      </button>
        <button 
          class="btn btn-outline-danger"
          id="delete-user"  
          onclick="deleteUserHandler(${index})"
        >
          Delete User
        </button>
      
        </div>`;
  });
  usersContainer.innerHTML = createdUsers;
};

const deleteUserHandler = (index) => {
  users.splice(index, 1);
  localStorage.setItem('Users', JSON.stringify(users));
  showUsersHandler();
};

const changeStatusHandler = (index) => {
  console.log(users[index].Status);
  if (users[index].Status === 'Active') {
    users[index].Status = 'Inactive';
    console.log(users[index].Status);
  } else if (users[index].Status === 'Inactive') {
    users[index].Status = 'Active';
    console.log(users[index].Status);
  }
  localStorage.setItem('Users', JSON.stringify(users));
  showUsersHandler();
};

formButton.addEventListener('click', formSubmitHandler);
showUsers.addEventListener('click', showUsersHandler);

console.log(JSON.parse(localStorage.getItem('Users')));
