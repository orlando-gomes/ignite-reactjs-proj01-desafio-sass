import styles from './EmptyTaskList.module.scss'
import clipboard from '../assets/clipboard.svg'

export function EmptyTaskList() {
  return(
    <div className={styles.wrapper}>
      <img src={clipboard} />
      <span>Você ainda não tem tarefas cadastradas</span>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  )
}