#include <linux/module.h>
#include <linux/hugetlb.h>
#include <linux/mm.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/quicklist.h>
#include <linux/syscalls.h>
#include <linux/fs.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <asm/uaccess.h>
#include <linux/mman.h>
#include <linux/mmzone.h>
#include <linux/swap.h>
#include <linux/swapfile.h>
#include <linux/vmstat.h>
#include <linux/atomic.h>
#include <linux/timekeeping.h>
//sudo mount -t fuse.vmhgfs-fuse .host:/Sis1 /c

//  struct sysinfo {
//               long uptime;             /* Seconds since boot */
//               unsigned long loads[3];  /* 1, 5, and 15 minute load averages */
//               unsigned long totalram;  /* Total usable main memory size */
//               unsigned long freeram;   /* Available memory size */
//               unsigned long sharedram; /* Amount of shared memory */
//               unsigned long bufferram; /* Memory used by buffers */
//               unsigned long totalswap; /* Total swap space size */
//               unsigned long freeswap;  /* Swap space still available */
//               unsigned short procs;    /* Number of current processes */
//               char _f[22];             /* Pads structure to 64 bytes */
//           };



static int my_proc_show(struct seq_file *m, void *v){
	struct sysinfo dita;

	unsigned long Porcen;
	unsigned long Ram_Usada;
	unsigned long Decimal;
	si_meminfo(&dita); 
	Ram_Usada=(dita.totalram-dita.freeram)*100;
	Porcen=Ram_Usada/ ((dita.totalram));
	Decimal=(Ram_Usada*10000)/ ((dita.totalram))-Porcen*10000;
	seq_printf(m,"%ld.%ld\n", Porcen,Decimal);
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
	entry = proc_create("mod_ram", 0777, NULL, &my_fops);
	if(!entry) {
		printk(KERN_INFO "Error Creando Archivo En PROC \n");
		return -1;	
	} else {
		printk(KERN_INFO "Inicio\n");
		return 0;
	}
}

static void __exit test_exit(void){
	remove_proc_entry("mod_ram",NULL);
	printk(KERN_INFO "Desligar\n");
}



module_init(test_init);
module_exit(test_exit);
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Andhy");
MODULE_DESCRIPTION("Modulo RAM");