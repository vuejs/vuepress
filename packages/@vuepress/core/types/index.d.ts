interface Plugin {
	name: string;
	enabled: boolean;
	clientRootMixin: string;
}

interface Config extends Plugin {

}

interface Theme extends Plugin {

}