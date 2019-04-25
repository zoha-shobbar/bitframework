
let testGetOfDtoSetController = async (): Promise<void> => {

    const contextProvider = Bit.DependencyManager.getCurrent().resolveObject<Bit.Contracts.IEntityContextProvider>("EntityContextProvider");
    const context = await contextProvider.getContext<TestContext>("Test");

    const model = await context.testCustomers.first(c => c.id == "28e1ff65-da41-4fa3-8aeb-5196494b407d");

    expect(model.id).toBe("28e1ff65-da41-4fa3-8aeb-5196494b407d");
    expect(model.name).toBe("TestCustomer");
    expect(model.cityId).toBe("ef529174-c497-408b-bb4d-c31c205d46bb");
    expect(model.cityName).toBe("TestCity");

};

let testPatchOfDtoSetController = async (): Promise<void> => {

    const contextProvider = Bit.DependencyManager.getCurrent().resolveObject<Bit.Contracts.IEntityContextProvider>("EntityContextProvider");
    const context = await contextProvider.getContext<TestContext>("Test");

    let model = await context.testCustomers.first(c => c.id == "28e1ff65-da41-4fa3-8aeb-5196494b407d");

    model.name += "?";

    await model.save();

    model = await context.testCustomers.first(c => c.id == "28e1ff65-da41-4fa3-8aeb-5196494b407d");

    expect(model.name).toBe("TestCustomer?");
};