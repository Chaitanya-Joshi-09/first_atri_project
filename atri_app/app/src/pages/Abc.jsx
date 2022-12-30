import { useLayoutEffect, useEffect } from "react";
import useStore, { updateStoreStateFromController } from "../hooks/useStore";
import useIoStore from "../hooks/useIoStore";
import { useNavigate, useLocation } from "react-router-dom";
import { subscribeInternalNavigation } from "../utils/navigate";
import {fetchPageProps} from "../utils/fetchPageProps"
import { Flex as Flex1 } from "@atrilabs/react-component-manifests/src/manifests/Flex/Flex.tsx";
import { useFlex2Cb } from "../page-cbs/abc";
import "../page-css/abc.css";
import "../custom/abc";

export default function Abc() {
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = subscribeInternalNavigation((url) => {
      navigate(url);
    });
    return unsub;
  }, [navigate]);

  const location = useLocation();
  useLayoutEffect(()=>{
    fetchPageProps(location.pathname, location.search).then((res)=>{
      updateStoreStateFromController(res.pageName, res.pageState)
    })
  }, [location])

  const Flex2Props = useStore((state)=>state["abc"]["Flex2"]);
const Flex2IoProps = useIoStore((state)=>state["abc"]["Flex2"]);
const Flex2Cb = useFlex2Cb()

  return (<>
  <Flex1 className="p-abc Flex2 bpt" {...Flex2Props} {...Flex2Cb} {...Flex2IoProps}/>
  </>);
}
