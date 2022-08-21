class Registration {

    constructor() {
        this.arrayRegistration = []
    }

    save() {
       let registration = this.dataReader()

       if(this.validator(registration)) {
            this.userClassification(registration)
       }

       this.registrationList()
    }

    registrationList () {
        let tbody = document.getElementById('tbody')

        tbody.innerHTML = ""

        for(let i = 0; i < this.arrayRegistration.length; i++ ) {
            let tr = tbody.insertRow()

            let td_name = tr.insertCell()
            let td_age = tr.insertCell()
            let td_classification = tr.insertCell()

            td_name.innerText = this.arrayRegistration[i].name
            td_age.innerText = this.arrayRegistration[i].age
            td_classification.innerText = this.arrayRegistration[i].classification
        }
    }

    register (registration) {
        this.arrayRegistration.push(registration)
        
        this.sortData()
        this.clearForm()
          
    }

    clearForm() {
        document.getElementById('name').value = ''
        document.getElementById('age').value = ''
    }

    sortData () {
        this.arrayRegistration.sort((a,b) => {
            
            if(a.age == b.age) {
            
                if(a.name.toUpperCase().trim() > b.name.toUpperCase().trim()) {
                    return 1
                }
                if(b.name.toUpperCase().trim() > a.name.toUpperCase().trim()) {
                    return -1
                }

                return 0 

            }
            return a.age - b.age            
        })
     
    }
    
    userClassification (registration) {
        if(registration.age <= 12) { 
            registration.classification = 'Child'
        } else if(registration.age > 12 && registration.age <= 19) {
            registration.classification = 'Teen'
        } else if(registration.age > 19 && registration.age <=  65) {
            registration.classification = 'Adult'
        } else {
            registration.classification = 'Elderly'
        }

        this.register(registration)
    }
    

    dataReader() {
        let registration = {}
        
        registration.name = document.getElementById('name').value
        registration.age = document.getElementById('age').value
        return registration 
    }

//avoid form from being submitted empty 
    validator(registration) {
        let message = ''
        const toast = Swal.mixin({
            toast: true,
            position: 'bottom-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        })
        
        if(registration.name == '' && registration.age == ''){
            message += "Oops, you need to fill out the form."
        } else if(registration.name == '') {
            message += 'Oops... Type your name to continue.'
        } else if(registration.age == '') {
            message += 'Oh, you forgot to type your age.'
        } else if(registration.age < 0 ) {
            message += 'Please, enter a valid age number.'
        }

        if(message != '') {
            toast.fire({
                title: message,
                icon: 'error'
            })
            return false
        } else {
            toast.fire({
                title: 'Nice to meet you, ' + registration.name,
                icon: 'success'
            })
            return true
        }
    }
}

var registration = new Registration()
   
