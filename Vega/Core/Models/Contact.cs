using System.ComponentModel.DataAnnotations;

namespace Vega.Core.Models
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
