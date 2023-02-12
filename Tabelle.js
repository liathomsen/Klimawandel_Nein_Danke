
    
    document.querySelectorAll(".filter-table").forEach(function (input) { 
      var table = document.querySelector(input.dataset.for); 
      var rows = table.querySelectorAll("tbody tr"); 
      input.addEventListener("input", () => { 
        rows.forEach(function (tr) { 
          if (input.value.length > 0) { 
            if (input.value[0] == input.value[0].toUpperCase()) { 
              tr.hidden = !tr.textContent.includes(input.value); 
            } else { 
              tr.hidden = !tr.textContent.toLowerCase().includes(input.value.toLowerCase()); 
            } 
          } else { 
            tr.hidden = !tr.textContent.includes(input.value); 
          } 
        }); 
      }); 
    }); 
    

   
    const table = document.getElementById("foobar-table"); 
    const headers = table.querySelectorAll("th"); 
    const tableBody = table.querySelector("tbody"); 
    const rows = tableBody.querySelectorAll("tr"); 
    const directions = Array.from(headers).map(function(header) { 
     return ""; 
    }); 
    
    const transform = function(index, content) { 
     const type = headers[index].getAttribute("data-type"); 
     switch (type) { 
         case "number": 
      return parseFloat(content); 
         case "string": 
         default: 
      return content; 
     } 
    }; 
    
    const sortColumn = function(index, headers) { 
    
     const cls = ["upArrow", "dnArrow"]; 
     headers.forEach((header) => { 
      document.getElementById(header.id).classList.remove(...cls); 
     }); 
    
      const direction = directions[index] || "asc"; 
      const multiplier = (direction === "asc") ? 1 : -1; 
      const cssSort = (direction === "asc") ? cls[0] : cls[1]; 
      document.getElementById(index).classList.add(cssSort); 
    
      const newRows = Array.from(rows); 
      newRows.sort((rowA, rowB) => { 
         const cellA = encodeURIComponent(rowA.querySelectorAll("td")[index].textContent.toLowerCase()); 
         const cellB = encodeURIComponent(rowB.querySelectorAll("td")[index].textContent.toLowerCase()); 
    
         const a = transform(index, cellA); 
         const b = transform(index, cellB); 
    
         switch (true) { 
          case a > b: return 1 * multiplier; 
          case a < b: return -1 * multiplier; 
          case a === b: return 0; 
           } 
       }); 
    
       [].forEach.call(rows, function(row) { 
           tableBody.removeChild(row); 
       }); 
    
       directions[index] = direction === "asc" ? "desc" : "asc"; 
       newRows.forEach(function(newRow) { 
           tableBody.appendChild(newRow); 
       }); 
     }; 
    
    [].forEach.call(headers, function(header, index) { 
       header.setAttribute("id", index); 
       header.addEventListener("click", () => { 
           sortColumn(index, headers); 
       }); 
    }); 
   