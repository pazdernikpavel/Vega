using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Vega.Models
{
    public class Contact
    {
        [Required]
        [StringLength(255)]
        public string Phone { get; set; }

        [StringLength(255)]
        public string Email { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }
    }
}
