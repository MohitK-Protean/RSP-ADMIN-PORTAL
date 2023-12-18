import * as XLSX from "xlsx";
import * as fileSaver from "file-saver";
import _ from 'lodash';

export const obscureEmail = (email) => {
  const [name, domain] = email.split("@");
  return `${name[0]}${new Array(name.length).join("*")}@${domain}`;
};

export const exportCSV = (typeofDownload, fileData, fileName) => {
  switch (typeofDownload) {
    case "XLSX":
      console.log({fileName})
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const ws = XLSX.utils.json_to_sheet(fileData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      fileSaver.saveAs(data, fileName + fileExtension);
      break;
    case "PDF":
      // const doc= new jsPDF({orientation:'landscape'});
    //   const columns=Object.keys(fileData[0]);
    //   const pdfTableData=fileData.map((obj)=>{return Object.values(obj)});
    //   console.log({columns,pdfTableData})
    //   doc.addPage()
    //   autoTable(doc,{ head: [['Name', 'Email', 'Country', ...columns]],
    //   body: [
    //     ['David', 'david@example.com', 'Sweden'],
    //     ['Castille', 'castille@example.com', 'Spain'],
    //     // ...
    //   ],
    //   styles: {
    //     minCellHeight: 9,
    //     halign: "left",
    //     valign: "center",
    //     fontSize: 11,
    //     width:300
    //   },
    // })
    // doc.addPage()
    // doc.addPage()
    //   doc.save(`${fileName}.pdf`)
      break;
    default:
      break;
  }
};

export const checkIfFull=(arr)=>{
  if(!_.isEmpty(arr)){ // not empty
  return arr.every((element)=>{
    const res=!_.isEmpty(element?.toString()) || !['null', [], null, undefined, 'undefined',''].includes(element)
    return res;
  })
}
return false 
}

