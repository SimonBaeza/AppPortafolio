export const DateUtil = (function() {
    const _monthsById = {
      1: 'Enero',
      2: 'Febrero',
      3: 'Marzo',
      4: 'Abril',
      5: 'Mayo',
      6: 'Junio',
      7: 'Julio',
      8: 'Agosto',
      9: 'Septiembre',
      10: 'Octubre',
      11: 'Noviembre',
      12: 'Diciembre'
    };
  
    const toString = (date = '') => {
      if (!date || date.split('-').length !== 3) {
        return '';
      }
      let [day, month, year] = date.split('-');
      if (day.length > 2) {
        [day, year] = [year, day];
      }
      const output = `${day} de ${_monthsById[+month]}, ${year}`;
      return output;
    };
  
    return {
      toString
    };
  })();