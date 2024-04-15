import {useState, useEffect} from 'react';

import styles from './Form.module.css';

import Input from '../components/form/Input';
import Select from '../components/form/Select';

function Form() {
    
    const [categories, setCategories] = useState([]);

    useEffect(() =>{
        fetch(
            'http://localhost:3000/class_categories',
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

    return(
       <section className={styles.form_container}>
            <h1>Formulário de Turmas</h1>
            <form>

                <Input type='text' name='name_student' id='name_student' text='Nome do Aluno(a)' placeholder='Digite o nome do aluno(a)' />
                <Select name='class_id' text='Selecione a turma do aluno(a)' options={categories} />

                <p>
                    <input type='submit' value='Cadastrar Aluno(a)' />
                </p>   

            </form>
       </section>
    )
}

export default Form;