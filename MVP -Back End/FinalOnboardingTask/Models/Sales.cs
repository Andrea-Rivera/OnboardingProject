using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace FinalOnboardingTask.Models
{
    public class Sales
    {
        
        public int SalesId { get; set; }

        public int ProductId { get; set; }

        public int CustomerId { get; set; }

        public int StoreId { get; set; }

        [Required]
        public DateTime? DateSold { get; set; }

        public virtual Products Products { get; set; }

        public virtual Customers Customers { get; set; }

        public virtual Stores Stores { get; set; }
    }
}
