using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace FinalOnboardingTask.Models
{
    public class Customers
    {
        
         public int CustomerId { get; set; }

        [Required]
        public string CustomerName { get; set; }
        [Required]
        public string CustomerAddress { get; set; }
       
    }

}