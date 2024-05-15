function skillsMember() {
    return {
        member: {
            name: 'member',
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Member ID',
                },
                name: {
                    type: 'string',
                    description: 'Member Name',
                },
                skills: {
                    type: 'array',
                    items: {
                        type: 'string',
                        description: 'Skill Name',
                    },
                },
            },
        },
    };
}
