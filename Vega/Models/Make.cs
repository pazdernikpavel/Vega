using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vega.Models
{
    [Table("Makes")]
    public class Make
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public ICollection<Make> Makes { get; set; }

        public Make()
        {
            Makes = new Collection<Make>();
        }     
    }
}