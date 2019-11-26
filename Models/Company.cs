using System;
using System.Collections.Generic;

namespace no_mas_accidentes.Models12
{
    public partial class Company
    {
        public Company()
        {
            Accident = new HashSet<Accident>();
            Consultation = new HashSet<Consultation>();
            Contract = new HashSet<Contract>();
            Pay = new HashSet<Pay>();
            RequestActivities = new HashSet<RequestActivities>();
            Visit = new HashSet<Visit>();
        }

        public decimal Rut { get; set; }
        public string SocialReason { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string ComercialBusiness { get; set; }
        public string Phone { get; set; }
        public decimal IdRole { get; set; }
        public string Password { get; set; }

        public virtual Role IdRoleNavigation { get; set; }
        public virtual ICollection<Accident> Accident { get; set; }
        public virtual ICollection<Consultation> Consultation { get; set; }
        public virtual ICollection<Contract> Contract { get; set; }
        public virtual ICollection<Pay> Pay { get; set; }
        public virtual ICollection<RequestActivities> RequestActivities { get; set; }
        public virtual ICollection<Visit> Visit { get; set; }
    }
}
