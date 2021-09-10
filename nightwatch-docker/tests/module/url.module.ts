

export function urlFromStub(stub){
	//'/dcU3wXc/ci-test-twilio?vr_entry_type=2d_now&test=true'
	if(process.env.FORCE_HOST) {
		return process.env.FORCE_HOST+stub;
	}else{
		return 'https://alphahub.aptero.co'+stub;
	}
}