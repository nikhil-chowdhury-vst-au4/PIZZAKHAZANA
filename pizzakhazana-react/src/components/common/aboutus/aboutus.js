import React from 'react'

class Aboutus extends React.Component{
    render(){
        return (
        <div>
            <div className='row mt-5'>
                <div className='col-1'></div>
                <div className='col-5'>
                    <h1 className="text-center indigo-text font-weight-bold">Who are we...?</h1>
                    <h4 className="mt-5">Launched in Delhi 11 years ago, Pizzakhazana has grown from a home project to one of the largest food aggregators in the world. We are present in 24 countries and 10000+ cities globally, enabling our vision of better food for more people. We not only connect people to food in every 
                        context but work closely with restaurants to enable a sustainable ecosystem.</h4>
                </div>
                <div className='col-5'>
                    <img src="https://i.pinimg.com/originals/64/df/4a/64df4ac7a836e59523273d93dc0d6d71.jpg" style={{"height":"500px", "width":"500px"}} alt="about us"></img>
                </div>
            </div>

            <hr className="mt-5"></hr>

            <div className="row mt-5 md-5">
                <div className="col-2"></div>
                <div className="col-8">
                    <h1 className="text-center indigo-text font-weight-bold ">Our Values</h1>
                <div className="card-deck mt-5">
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Resilience</h5>
                        <p className="card-text">We push ourselves beyond our abilities when faced with tough times. 
                        When we foresee uncertainty, we address it only with flexibility.</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Acceptance</h5>
                        <p className="card-text">Feedback is never taken personally, we break it into positive pieces 
                        and strive to work on each and every element even more effectively.</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Ownership</h5>
                        <p className="card-text">People here don’t work ‘for’ pizzakhazana, they work ‘with’ pizzakhazana. 
                        We treat every problem as our own, take accountability and drive the change.</p>
                        </div>
                    </div>
                    </div>
                    <div className="card-deck mt-4">

                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Humility</h5>
                        <p className="card-text">It’s always ‘us’ over ‘me’. We don’t lose ourselves in pride or confidence 
                        during individual successes, 
                        but focus on being our simple selves in every which way.</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Spark</h5>
                        <p className="card-text">We believe in, stand for and are evangelists of our 
                        culture - both, within pizzakhazana and externally with all our stakeholders.</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Judgement</h5>
                        <p className="card-text">It’s not our abilities that show who we truly are - it’s our choices.
                        We aim to get these right, at least in the majority of the cases.</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className='col-2'></div>
            </div>

            <hr className="mt-5"></hr>

            <div className='row mt-5'>
                <div className='col-1'></div>
                <div className='col-5'>
                    <h1 className="text-center indigo-text font-weight-bold">Our Journey</h1>
                    <h4 className="mt-5">Back in 2008, all it took was an idea to enable digital access to thousands of restaurant menus. Three passionate foodies who hated waiting in lines, drove around Delhi to collect menus from restaurants, scan them and put them online. 
                    Their idea has now grown into the vision that drives our team of 5000+ people everyday.</h4>
                </div>
                <div className='col-5 mt-5'>
                    <img src="https://b.zmtcdn.com/web/about/865bfb91ba1264b14cc37e64e6ab60ae1563208544.png" style={{"height":"400px", "width":"550px"}} alt="about us"></img>
                </div>
                <div className='col-1'></div>
            </div>
        </div>
        )
    }
}

export default Aboutus