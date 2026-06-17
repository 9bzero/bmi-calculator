import{useState,useMemo}from'react'
  const CATS=[{max:18.5,label:"Underweight",color:"#38bdf8",desc:"Consider consulting a nutritionist"},{max:25,label:"Normal",color:"#22c55e",desc:"Great! Maintain your healthy lifestyle"},{max:30,label:"Overweight",color:"#f59e0b",desc:"Light exercise and diet changes can help"},{max:Infinity,label:"Obese",color:"#ef4444",desc:"Please consult a healthcare professional"}]
  export default function App(){
    const[unit,setUnit]=useState<"metric"|"imperial">("metric")
    const[weight,setWeight]=useState(70)
    const[height,setHeight]=useState(175)
    const[feet,setFeet]=useState(5)
    const[inches,setInches]=useState(9)
    const[lbs,setLbs]=useState(154)
    const bmi=useMemo(()=>{
      if(unit==="metric")return weight/(height/100)**2
      const totalInches=feet*12+inches;const h=totalInches*0.0254
      return(lbs*0.453592)/(h**2)
    },[unit,weight,height,feet,inches,lbs])
    const cat=CATS.find(c=>bmi<c.max)||CATS[3]
    const ideal_min=(18.5*(unit==="metric"?height/100:((feet*12+inches)*0.0254))**2)
    const ideal_max=(24.9*(unit==="metric"?height/100:((feet*12+inches)*0.0254))**2)
    const fmtW=(v:number)=>unit==="metric"?v.toFixed(1)+" kg":(v/0.453592).toFixed(1)+" lbs"
    const pct=Math.min(100,Math.max(0,(bmi-15)/(45-15)*100))
    return(
      <div style={{minHeight:"100vh",fontFamily:"Inter,system-ui,sans-serif",color:"#e2e8f0",padding:"2rem",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{width:"100%",maxWidth:520}}>
          <h1 style={{fontWeight:800,fontSize:"1.75rem",marginBottom:"1.5rem",textAlign:"center",color:"#f8fafc"}}>⚖️ BMI Calculator</h1>
          <div style={{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",justifyContent:"center"}}>
            {(["metric","imperial"] as const).map(u=><button key={u} onClick={()=>setUnit(u)} style={{padding:"0.4rem 1.25rem",background:unit===u?"#0ea5e9":"#1e293b",color:unit===u?"#fff":"#94a3b8",border:"none",borderRadius:8,cursor:"pointer",fontWeight:600,textTransform:"capitalize"}}>{u}</button>)}
          </div>
          <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:16,padding:"2rem",marginBottom:"1.5rem"}}>
            {unit==="metric"?(
              <>
                <div style={{marginBottom:"1.25rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.5rem"}}><span style={{color:"#94a3b8"}}>Weight (kg)</span><span style={{color:"#38bdf8",fontWeight:700}}>{weight} kg</span></div>
                  <input type="range" min={30} max={200} value={weight} onChange={e=>setWeight(+e.target.value)} style={{width:"100%",accentColor:"#38bdf8"}}/>
                </div>
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.5rem"}}><span style={{color:"#94a3b8"}}>Height (cm)</span><span style={{color:"#38bdf8",fontWeight:700}}>{height} cm</span></div>
                  <input type="range" min={120} max={220} value={height} onChange={e=>setHeight(+e.target.value)} style={{width:"100%",accentColor:"#38bdf8"}}/>
                </div>
              </>
            ):(
              <>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1.25rem"}}>
                  <div><div style={{color:"#94a3b8",fontSize:"0.85rem",marginBottom:"0.4rem"}}>Feet</div><input type="number" value={feet} onChange={e=>setFeet(+e.target.value)} min={4} max={7} style={{width:"100%",background:"#0f172a",border:"1px solid #334155",borderRadius:6,padding:"0.5rem",color:"#e2e8f0",outline:"none"}}/></div>
                  <div><div style={{color:"#94a3b8",fontSize:"0.85rem",marginBottom:"0.4rem"}}>Inches</div><input type="number" value={inches} onChange={e=>setInches(+e.target.value)} min={0} max={11} style={{width:"100%",background:"#0f172a",border:"1px solid #334155",borderRadius:6,padding:"0.5rem",color:"#e2e8f0",outline:"none"}}/></div>
                </div>
                <div><div style={{color:"#94a3b8",fontSize:"0.85rem",marginBottom:"0.4rem"}}>Weight (lbs)</div><input type="number" value={lbs} onChange={e=>setLbs(+e.target.value)} min={50} max={500} style={{width:"100%",background:"#0f172a",border:"1px solid #334155",borderRadius:6,padding:"0.5rem",color:"#e2e8f0",outline:"none"}}/></div>
              </>
            )}
          </div>
          <div style={{background:"#111827",border:"1px solid "+(cat?.color+"44"),borderRadius:16,padding:"2rem",textAlign:"center",marginBottom:"1.5rem"}}>
            <div style={{fontSize:"3rem",fontWeight:900,color:cat?.color,marginBottom:"0.25rem"}}>{bmi.toFixed(1)}</div>
            <div style={{fontWeight:700,fontSize:"1.2rem",color:cat?.color,marginBottom:"0.5rem"}}>{cat?.label}</div>
            <div style={{color:"#94a3b8",fontSize:"0.85rem",marginBottom:"1.5rem"}}>{cat?.desc}</div>
            <div style={{position:"relative",height:10,background:"#1e293b",borderRadius:5,marginBottom:"0.5rem",overflow:"hidden"}}>
              {[{c:"#38bdf8",w:18.5/45*100},{c:"#22c55e",w:(25-18.5)/45*100},{c:"#f59e0b",w:(30-25)/45*100},{c:"#ef4444",w:100}].map((s,i)=>(
                <div key={i} style={{position:"absolute",left:(i===0?0:i===1?18.5/45*100:i===2?25/45*100:30/45*100)+"%",width:s.w+"%",height:"100%",background:s.c}}/>
              ))}
              <div style={{position:"absolute",left:pct+"%",top:-2,width:14,height:14,background:"#fff",borderRadius:"50%",transform:"translateX(-50%)",boxShadow:"0 0 6px rgba(0,0,0,0.5)"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.68rem",color:"#475569",marginTop:"0.25rem"}}>{["15","18.5","25","30","45"].map(v=><span key={v}>{v}</span>)}</div>
          </div>
          <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:12,padding:"1rem"}}>
            <div style={{color:"#94a3b8",fontSize:"0.8rem",marginBottom:"0.5rem"}}>HEALTHY WEIGHT RANGE</div>
            <div style={{fontWeight:700,color:"#22c55e"}}>{fmtW(ideal_min)} — {fmtW(ideal_max)}</div>
          </div>
        </div>
      </div>
    )
  }