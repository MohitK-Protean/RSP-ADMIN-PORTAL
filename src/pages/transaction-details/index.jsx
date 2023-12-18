import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import RSPCard from "../../components/card";
import { RSPLogs } from "../../components/logs";
import AuthContext from "../../context/auth-context";
import axios from 'axios'

const TransactionDetails = () => {
  const queryString=useParams();
  const [transactionLog, setLog]=useState([])
  const authContext=useContext(AuthContext);
  const transactionLogs = [
    {
      title: "/RECON",
      date: "2022-09-14T07:25:03.082Z",
      children: <p className="text-small">10 Order Object</p>,
      downloadLogs: true,
    },
    {
      title: "/RECON",
      date: "2022-09-14T07:25:03.082Z",
      children: <p className="text-small">10 Order Object</p>,
      downloadLogs: true,
    },
    {
      title: "/RECON",
      date: "2022-09-14T07:25:03.082Z",
      children: <p className="text-small">10 Order Object</p>,
      downloadLogs: true,
    },
    {
      title: "/RECON",
      date: "2022-09-14T07:25:03.082Z",
      children: <p className="text-small">10 Order Object</p>,
      downloadLogs: true,
    },
  ];
  const id=queryString?.slug||'';
  useEffect(()=>{
    var config = {
      method: "GET",
      url: `/admin/rspadmin/transactionlogs/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization:authContext.token
      },
    };
    axios(config)
    .then(function (response) {
      console.log(response.data);
      setLog(response.data.body);
    })
    .catch(function (error) {
      console.log(error);
    });
  },[])
  return (
    <>
      <h2 className="heading-bold mb-20">12 - K106403902 -INV106403 </h2>
      <RSPCard className="w-60">
        <RSPLogs items={transactionLog} />
      </RSPCard>
    </>
  );
};

export default TransactionDetails;
