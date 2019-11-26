using System;
using System.Collections.Generic;

namespace no_mas_accidentes.Models12
{
    public partial class Role
    {
        public Role()
        {
            Company = new HashSet<Company>();
            User = new HashSet<User>();
        }

        public decimal Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Company> Company { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}
