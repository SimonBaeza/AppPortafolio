using System;
using System.Collections.Generic;

namespace no_mas_accidentes.Models12
{
    public partial class Task
    {
        public decimal Id { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public string TypeTask { get; set; }
    }
}
