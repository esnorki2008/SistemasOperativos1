#include <linux/module.h>
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/proc_fs.h>
#include <linux/sched.h>
#include <linux/sched/signal.h>
#include <linux/uaccess.h>
#include <linux/fs.h>
#include <linux/sysinfo.h>
#include <linux/seq_file.h>
#include <linux/slab.h>
#include <linux/mm.h>
#include <linux/swap.h>
#include <linux/timekeeping.h>

//sudo mount -t fuse.vmhgfs-fuse .host:/Sis1 /c
static int my_proc_show(struct seq_file *m, void *v){
	int CantidadTotal;
    struct task_struct *task;
	struct task_struct *task_child; 
	struct list_head *list;
	int Carga;
	int Espera;
	int Carnet;

   
	
	Carga=0;
	Espera=0;
	for_each_process(task)
    {
        
		if (task->state==0)
			Carga++;
		else if(task->state==1 || task->state==2)
		{
			Espera++;
		}else if(task->state==3 || task->state==4)
		{
			Espera++;
		}else{
			Espera++;
		}

		

        list_for_each(list,&task->children) {
            task_child=list_entry(list,struct task_struct,sibling);
			if (task_child->state==0)
				Carga++;
			else if(task_child->state==1 || task_child->state==2)
			{
				Espera++;
			}else if(task_child->state==3 || task_child->state==4)
			{
				Espera++;
			}else{
				Espera++;
			}
    	}
	}
	
	
	CantidadTotal=Carga+Espera;
	Carnet=201700886;
	seq_printf(m," CantidadTotal: %d \n", CantidadTotal);	
	seq_printf(m," Procesos Ejecutando/Ejecucion: %d \n", Carga);
	seq_printf(m," Procesos Inactivos: %d \n", Espera);
	seq_printf(m," Proyecto1-Sistemas1-AndhySolis-%d \n", Carnet);
    return 0;
}

static ssize_t my_proc_write(struct file* file, const char __user *buffer, size_t count, loff_t *f_pos){
    return 0;
}

static int my_proc_open(struct inode *inode, struct file *file){
	return single_open(file, my_proc_show, NULL);
}

static struct file_operations my_fops={
	.owner = THIS_MODULE,
	.open = my_proc_open,
	.release = single_release,
	.read = seq_read,
	.llseek = seq_lseek,
	.write = my_proc_write
};

static int __init test_init(void){
	struct proc_dir_entry *entry;
	entry = proc_create("mod_cpu", 0777, NULL, &my_fops);
	if(!entry) {
		printk(KERN_INFO "Error Creando Archivo En PROC \n");
		return -1;	
	} else {
		printk(KERN_INFO "Inicio\n");
		return 0;
	}
}

static void __exit test_exit(void){
	remove_proc_entry("mod_cpu",NULL);
	printk(KERN_INFO "Desligar\n");
}



module_init(test_init);
module_exit(test_exit);
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Andhy");
MODULE_DESCRIPTION("Modulo CPU");