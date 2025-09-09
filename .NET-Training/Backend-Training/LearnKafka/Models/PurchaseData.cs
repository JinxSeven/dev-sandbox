using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Producer.Models
{
    public class PurchaseData
    {
        [Required]
        public string ProductName { get; set; }
        [Required]
        public Guid ProductCode { get; set; } = Guid.NewGuid();
    }
}
