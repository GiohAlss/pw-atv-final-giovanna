import {useState, useEffect} from 'react';

import styles from './Form.module.css';

import Input from '../components/form/Input';
import Select from '../components/form/Select';

function Form() {
    
    const [categories, setCategories] = useState([]);
    const [classes, setClasses] = useState({});

    useEffect(() =>{
        fetch(
            'http://localhost:5000/class_categories',
            {
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(
                (resp)=>
                    resp.json()
            ).then(
                (data)=>{
                    setCategories(data);
                    console.log(data);
                }
            ).catch(
                (error)=>{
                    console.log(error);
                }
            )
        }, [])

        function handlerChangeClasses(event) {
            setClasses({...classes, [event.target.name] : event.target.value});
            console.log(classes)
        }

        function handlerChangeCategory(event) {
            setClasses({...classes, category:{
                id: event.target.value,
                category: event.target.options[event.target.selectedIndex].text
            }});
        }

        console.log(classes)

        function createStudent(classes) {
            fetch('http://localhost:5000/class', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(classes)
            })
            .then(
                (resp)=>resp.json()
            )
            .then(
                (data)=>{
                    console.log(data)
                }
            )
            .catch(
                (err)=>{
                    console.log(err)
                }
            )
        } 

        function submit(event){
            event.preventDefault();
            createStudent(classes)
        }

    return(
       <section className={styles.form_container}>
            <h1>Formulário de Turmas</h1>
            <form onSubmit={submit}>

                <Input type='text' name='name_student' id='name_student' text='Nome do Aluno(a)' placeholder='Digite o nome do aluno(a)' handlerOnchange={handlerChangeClasses} />
                <Select name='class_id' text='Selecione a turma do aluno(a)' options={categories} handlerOnchange={handlerChangeCategory} />

                <p>
                    <input type='submit' value='Cadastrar Aluno(a)' />
                </p>   

            </form>
       </section>
    )
}

export default Form;