using System;
using System.Collections.Generic;

namespace no_mas_accidentes.Models12
{
    public partial class Pay
    {
        public decimal Id { get; set; }
        public decimal IdCompany { get; set; }
        public decimal Cost { get; set; }
        public DateTime DatePay { get; set; }

        public virtual Company IdCompanyNavigation { get; set; }
    }
}
