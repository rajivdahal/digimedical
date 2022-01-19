import { useEffect,useState } from "react"
import { httpClient } from "../../../../utils/httpClient"
import "./labTestImages.component.css"
const REACT_APP_BASE_URL=process.env.REACT_APP_BASE_URL

export const LabTestImages=(props)=>{
    const [labTestReportId,setlabTestReportId]=useState([])
    console.log("props are",props)
    useEffect(()=>{
        let lab=labTestReportId
        httpClient.GET("lab-report/get-all/"+props.labTestData.labtestbookingid,false,true)
        .then(resp=>{
            resp.data.data.map((item)=>{
                httpClient.GET("lab-report/download/"+item.labtestreportid)
                .then(resp=>{
                    console.log("response is",resp)
                    lab.push(resp.data)
                    // lab.push(URL.createObjectURL(resp.data))
                    // debugger
                    //   var reader=new FileReader()
                    // reader.readAsDataURL(resp.data)
                    // reader.onload=()=>{
                    //     var base64=reader.result
                    //     console.log("base 64 is",base64)
                    //     lab.push(base64)
                    // }
                    // reader.onerror=(error)=>{
                    //     console.log("error while reading url",error)
                    // }
                })
                .catch(err=>{
                    console.log("error occurred while fetching the image")
                })
            })
            console.log("response is",resp.data)
        })
        .catch(err=>{
            console.log("Something went wrong")
        })
        .finally(()=>{
            setlabTestReportId(lab)
        })
        
    setTimeout(() => {
        console.log("lab report is",labTestReportId)
    }, 2000);    
    })
    return (
        <>
        <div class="overlay">
	<div class="popup">
		<h2>Here i am</h2>
		<a class="close" onClick={props.showLabTest} >&times;</a>
		<div class="content">
            {
               labTestReportId.map((item)=>{
                return <img src="/form.jpg"></img>
               }) 
            }
			
		</div>
	</div>
</div>
        </>
    )
}