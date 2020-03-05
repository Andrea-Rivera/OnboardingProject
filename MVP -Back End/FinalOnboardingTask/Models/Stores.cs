using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace FinalOnboardingTask.Models
{
    public class Stores
    {
        public int StoreId { get; set; }

        [Required]
        public string StoreName { get; set; }
        [Required]
        public string StoreAddress { get; set; }


    }
    
}