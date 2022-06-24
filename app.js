var courseAPI = 'http://localhost:3000/courses';

function start() {
    getCourses(renderCourses);

    handleCreateForm();
}

start()

// function
function getCourses(callback){
    fetch(courseAPI)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function renderCourses(courses){
    var listCourses = document.querySelector('#list-courses');
    var htmls = courses.map(function(course){
        return `
            <li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
                <button onclick="handleUpdateCourse(${course.id})">Chỉnh sửa</button>
            </li>
        `
    });

    listCourses.innerHTML = htmls.join('');
}


function handleCreateForm(){
    var create = document.querySelector('#create');
    
    create.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var desc = document.querySelector('.desc_input').value;
        var data = {
            name: name,
            description: desc
        };

        createCourse(data, function(){
            getCourses(renderCourses);
        });        
    }
}

function createCourse(data, callback){
    var options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)  
    };

    fetch(courseAPI, options)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function handleDeleteCourse(id){
    var options = {
        method: "DELETE",
    };

    fetch(courseAPI + '/' + id, options)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            var courseItem = document.querySelector('.course-item-' + course.id);
            courseItem.remove();
        });
}

function handleUpdateCourse(id){
    var courseItemApi = courseAPI + '/' + id;
    fetch(courseItemApi)
        .then(function(response){
            return response.json();
        })
        .then(updateCourse);
}

function updateCourse(course){
    var name = document.querySelector('input[name="name"]');
    var desc = document.querySelector('.desc_input');
    var btn = document.querySelector('#create')

    name.value = course.name;
    desc.value = course.description;
    btn.innerText = 'Update';

    btn.onclick = function() {
        var nameValue = document.querySelector('input[name="name"]').value;
        var descValue = document.querySelector('.desc_input').value;

        var dataSend = {
            name: nameValue,
            description: descValue
        }

        var fetchOptions = {
            method: "PUT",
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(dataSend) 
        }

        var courseItemApi = courseAPI + '/' + course.id;
        fetch(courseItemApi, fetchOptions)
            .then(function(response){
                return response.json();
            })
            .then(function(){
                getCourses(renderCourses);
            });

        btn.innerText = "Create"
    }
}